import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  isBrailleEnabled,
  ResourceSelectionsModel
} from "../Accessibility/AccessibilityModels";
import {
  AccResourceGroupModel,
  AccessibilityResourceModel,
  ItemViewerContainer,
  AboutItemModel,
  ItemModel,
  ItemIsaapModel,
  ItemPageModel,
  ItemIdentifierModel,
  toCookie,
  toiSAAP,
  resetResource,
  Resource,
  getResourceContent,
  parseQueryString,
  LoadingOverlay
} from "../index";

export interface ItemPageContainerProps {
  aboutThisClient: (params: ItemModel) => Promise<AboutItemModel>;
  itemPageClient: (params: ItemModel) => Promise<ItemPageModel>;
  itemAccessibilityClient: (
    params: ItemIsaapModel
  ) => Promise<AccResourceGroupModel[]>;
  showRubrics: boolean;
  itemIsaap: ItemIsaapModel;
  updateIsaap: (isaap: string) => void;
  updateCookie: (cookieName: string, cookieValue: string) => void;
}

export interface ItemPageContainerState {
  aboutThisItem: Resource<AboutItemModel>;
  itemPageVM: Resource<ItemPageModel>;
  itemAccessibility: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemIdentifierModel;
  item: ItemModel;
  loading: boolean;
}

export class ItemPageContainer extends React.Component<
  ItemPageContainerProps,
  ItemPageContainerState
> {
  constructor(props: ItemPageContainerProps) {
    super(props);

    this.state = {
      item: this.props.itemIsaap,
      aboutThisItem: { kind: "loading" },
      itemPageVM: { kind: "loading" },
      itemAccessibility: { kind: "loading" },
      loading: true
    };
  }

  componentDidMount() {
    this.fetchItemPage(this.state.item);

    if (
      this.state.itemAccessibility.kind === "success" &&
      this.state.itemAccessibility.content
    ) {
      this.updateIsaapHandler(this.state.itemAccessibility.content);
    }
  }

  fetchItemPage(item: ItemModel) {
    this.props
      .itemPageClient(item)
      .then(data => this.onGetItemPage(data))
      .then(() =>
        this.props
          .itemAccessibilityClient(item)
          .then(data => this.onGetItemAccessibility(data))
          .catch(err => this.onError(err))
      )
      .then(() => this.setCurrentItem())
      .then(() => this.fetchUpdatedAboutThisItem())
      .catch(err => this.onError(err));
  }

  componentWillReceiveProps(nextProps: ItemPageContainerProps) {
    const nextItem: ItemModel = nextProps.itemIsaap;
    const currItem: ItemModel = this.props.itemIsaap;

    if (
      nextItem.bankKey !== currItem.bankKey ||
      nextItem.itemKey !== currItem.itemKey
    ) {
      this.setState({
        item: nextItem,
        aboutThisItem: { kind: "loading" },
        itemPageVM: { kind: "loading" },
        itemAccessibility: { kind: "loading" },
        loading: true
      });

      this.fetchItemPage(nextItem);

      if (
        this.state.itemAccessibility.kind === "success" &&
        this.state.itemAccessibility.content
      ) {
        this.updateIsaapHandler(this.state.itemAccessibility.content);
      }
    }
  }

  private setCurrentItem() {
    const itemPage = this.getItemPage();
    const itemAcc = this.getItemAccessibility();

    let currentItem: ItemIdentifierModel | undefined;
    if (itemPage && itemAcc) {
      currentItem = isBrailleEnabled(itemAcc)
        ? itemPage.brailleItem
        : itemPage.nonBrailleItem;
    }

    this.setState({ currentItem });
  }

  onGetItemPage(data: ItemPageModel) {
    this.setState({
      itemPageVM: { kind: "success", content: data },
      loading: false
    });
  }

  onGetItemAccessibility(data: AccResourceGroupModel[]) {
    this.setState({
      itemAccessibility: { kind: "success", content: data }
    });
  }

  onError(err: Error) {
    this.setState({ loading: false });
    console.error(err);
  }

  private getItemPage(): ItemPageModel | undefined {
    return getResourceContent(this.state.itemPageVM);
  }

  private getAboutItem(): AboutItemModel | undefined {
    return getResourceContent(this.state.aboutThisItem);
  }

  private getItemAccessibility(): AccResourceGroupModel[] | undefined {
    return getResourceContent(this.state.itemAccessibility);
  }

  onSave = (selections: ResourceSelectionsModel) => {
    const itemAcc = this.getItemAccessibility();
    const itemPage = this.getItemPage();
    if (itemPage && itemAcc) {
      const newGroups: AccResourceGroupModel[] = [];
      for (const group of itemAcc) {
        const newGroup = { ...group };
        const newResources: AccessibilityResourceModel[] = [];
        for (const res of newGroup.accessibilityResources) {
          const newRes = { ...res };
          newRes.currentSelectionCode =
            selections[newRes.resourceCode] || newRes.currentSelectionCode;
          newResources.push(newRes);
        }
        newGroup.accessibilityResources = newResources;
        newGroups.push(newGroup);
      }

      this.onGetItemAccessibility(newGroups);
      this.setCurrentItem();
      this.updateIsaapCookieHandler(newGroups);
      this.updateIsaapHandler(newGroups);
    } else {
      console.error("Error no item to update resources");
    }
  };

  updateIsaapHandler(resources: AccResourceGroupModel[]) {
    const isaap = decodeURIComponent(toiSAAP(resources, ""));
    this.props.updateIsaap(isaap);
  }

  updateIsaapCookieHandler(accGroups?: AccResourceGroupModel[]) {
    const itemPage = this.getItemPage();
    const cookieValue = accGroups ? toCookie(accGroups) : "";
    if (itemPage) {
      this.props.updateCookie(itemPage.accessibilityCookieName, cookieValue);
    }
  }

  onReset = () => {
    const itemPage = this.getItemPage();
    const itemAcc = this.getItemAccessibility();
    if (itemPage && itemAcc) {
      const newItemPage = { ...itemPage };

      this.updateIsaapCookieHandler();

      const newAccResourceGroups = itemAcc.map(g => {
        const newGroup = { ...g };
        newGroup.accessibilityResources = newGroup.accessibilityResources.map(
          resetResource
        );

        return newGroup;
      });

      this.onGetItemAccessibility(newAccResourceGroups);
      this.setCurrentItem();
      this.fetchUpdatedAboutThisItem();
    } else {
      console.error("Error no item to reset");
    }
  };

  fetchUpdatedAboutThisItem() {
    const item = this.state.currentItem;
    if (item) {
      this.props
        .aboutThisClient(item)
        .then(data => this.onFetchedUpdatedViewModel(data))
        .catch(err => this.onError(err));
    }
  }

  onFetchedUpdatedViewModel(viewModel: AboutItemModel) {
    this.setState({
      aboutThisItem: { kind: "success", content: viewModel }
    });
  }

  onFetchUpdatedAboutError(err: Error) {
    console.error(err);
    this.setState({
      aboutThisItem: { kind: "failure" },
      loading: false
    });
  }

  render() {
    const aboutThisItem = this.getAboutItem();
    const itemDetails = this.state.currentItem;
    const itemPage = this.getItemPage();
    const itemAccessibility = this.getItemAccessibility();
    let content: JSX.Element | undefined;
    if (aboutThisItem && itemPage && itemDetails && itemAccessibility) {
      content = (
        <ItemViewerContainer
          {...itemPage}
          aboutThisItemVM={aboutThisItem}
          onSave={this.onSave}
          onReset={this.onReset}
          currentItem={itemDetails}
          accResourceGroups={itemAccessibility}
          showRubrics={this.props.showRubrics}
        />
      );
    }

    return (
      <LoadingOverlay loading={this.state.loading}>
        <div className="container item-page">{content}</div>
      </LoadingOverlay>
    );
  }
}
