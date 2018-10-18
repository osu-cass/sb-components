import * as React from "react";
import * as ReactDOM from "react-dom";
import { Redirect } from "react-router";
import {
  isBrailleEnabled,
  ResourceSelectionsModel,
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
  LoadingOverlay,
  PromiseCancelable,
  Subscription
} from "@src/index";

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
  errorRedirectPath: string;
}

export interface ItemPageContainerState {
  aboutThisItem: Resource<AboutItemModel>;
  itemPageVM: Resource<ItemPageModel>;
  itemAccessibility: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemIdentifierModel;
  item: ItemModel;
  loading: boolean;
  redirect: boolean;
}

export class ItemPageContainer extends React.Component<
  ItemPageContainerProps,
  ItemPageContainerState
> {
  private subscription = new Subscription();

  constructor(props: ItemPageContainerProps) {
    super(props);

    this.state = {
      item: this.props.itemIsaap,
      aboutThisItem: { kind: "loading" },
      itemPageVM: { kind: "loading" },
      itemAccessibility: { kind: "loading" },
      loading: true,
      redirect: false
    };
  }

  componentDidMount() {
    this.fetchItemPage(this.state.item);
  }

  componentWillUnmount() {
    this.subscription.cancelAll();
  }

  fetchItemPage(item: ItemModel) {
    const { itemPageClient, itemAccessibilityClient } = this.props;

    const itemProm = this.subscription.add(
      "itemPageClient",
      itemPageClient(item)
    );
    const accessProm = this.subscription.add(
      "accessClient",
      itemAccessibilityClient(item)
    );

    itemProm.promise
      .then(data => this.onGetItemPage(data))
      .then(() => {
        accessProm.promise
          .then(data => {
            this.onGetItemAccessibility(data);
            this.setCurrentItem();
            this.fetchUpdatedAboutThisItem();
          })
          .catch(err => this.onError(err));
      })
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
    this.updateIsaapHandler(data);
  }

  onError(err: string) {
    if (err !== "Canceled") {
      this.setState({ loading: false, redirect: true });
    }
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

  onSave = (newGroups: AccResourceGroupModel[]) => {
    const itemPage = this.getItemPage();
    if (itemPage) {
      this.onGetItemAccessibility(newGroups);
      this.setCurrentItem();
      this.updateIsaapCookieHandler(newGroups);
    } else {
      throw new Error("No item to update resources");
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
      throw new Error("Error no item to reset");
    }
  };

  fetchUpdatedAboutThisItem() {
    const item = this.state.currentItem;
    if (item) {
      const aboutThisProm = this.subscription.add(
        "aboutThisClient",
        this.props.aboutThisClient(item)
      );
      aboutThisProm.promise
        .then(data => this.onFetchedUpdatedViewModel(data))
        .catch(err => this.onError(err));
    }
  }

  onFetchedUpdatedViewModel(viewModel: AboutItemModel) {
    this.setState({
      aboutThisItem: { kind: "success", content: viewModel }
    });
  }

  onFetchUpdatedAboutError(err: string) {
    if (err !== "Canceled") {
      this.setState({
        aboutThisItem: { kind: "failure" },
        loading: false
      });
    }
  }

  render() {
    const { redirect } = this.state;
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

    return redirect ? (
      <Redirect push to={this.props.errorRedirectPath} />
    ) : (
      <LoadingOverlay loading={this.state.loading}>
        <div className="container item-page">{content}</div>
      </LoadingOverlay>
    );
  }
}
