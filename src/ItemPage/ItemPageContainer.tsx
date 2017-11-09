import "@osu-cass/smarter-balanced-styles/styles/advanced-filter.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import {
  AccessibilityResourceModel,
  AccResourceGroupModel,
  isBrailleEnabled,
  ResourceSelectionsModel
} from "../Accessibility/AccessibilityModels";
import {
  get,
  getResourceContent,
  parseQueryString,
  Resource
} from "../ApiModel";
import "../Styles/item.less";
import { ItemPage } from "./ItemPage";
import {
  ItemIdentifierModel,
  ItemIsaapModel,
  ItemModel,
  ItemPageModel,
  resetResource,
  toCookie,
  toiSAAP
} from "./ItemPageModels";

export interface ItemPageContainerProps extends RouteComponentProps<{}> {
  aboutThisClient: (params: ItemModel) => Promise<AboutItemModel>;
  itemPageClient: (params: ItemModel) => Promise<ItemPageModel>;
  itemAccessibilityClient: (
    params: ItemIsaapModel
  ) => Promise<AccResourceGroupModel[]>;
}

export interface ItemPageState {
  aboutThisItem: Resource<AboutItemModel>;
  itemPageVM: Resource<ItemPageModel>;
  itemAccessibility: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemIdentifierModel;
  item: ItemModel;
}

export class ItemPageContainer extends React.Component<
  ItemPageContainerProps,
  ItemPageState
> {
  constructor(props: ItemPageContainerProps) {
    super(props);

    const queryObject = parseQueryString(location.search);
    const itemKey = +(queryObject.itemKey || [])[0] || 0;
    const bankKey = +(queryObject.bankKey || [])[0] || 0;
    const isaap = (queryObject.isaap || [])[0] || "";

    const item: ItemIsaapModel = { itemKey, bankKey, isaap };

    this.state = {
      aboutThisItem: { kind: "loading" },
      itemPageVM: { kind: "loading" },
      itemAccessibility: { kind: "loading" },
      item
    };

    this.props
      .itemPageClient(this.state.item)
      .then(data => this.onGetItemPage(data))
      .then(() =>
        this.props
          .itemAccessibilityClient(this.state.item)
          .then(data => this.onGetItemAccessibility(data))
          .catch(err => this.onError(err))
      )
      .then(() => this.setCurrentItem())
      .then(() => this.fetchUpdatedAboutThisItem())
      .catch(err => this.onError(err));
  }

  setCurrentItem() {
    const itemPage = this.getItemPage();
    const itemAcc = this.getItemAccessibility();

    let currentItem: ItemIdentifierModel | undefined;
    if (itemPage && itemAcc) {
      currentItem = isBrailleEnabled(itemAcc)
        ? itemPage.brailleItem
        : itemPage.nonBrailleItem;
    }

    this.setState({
      currentItem
    });
  }

  onGetItemPage(data: ItemPageModel) {
    this.setState({
      itemPageVM: { kind: "success", content: data }
    });
  }

  onGetItemAccessibility(data: AccResourceGroupModel[]) {
    this.setState({
      itemAccessibility: { kind: "success", content: data }
    });
  }

  onError(err: any) {
    console.error(err);
  }

  getItemPage(): ItemPageModel | undefined {
    const itemPage = this.state.itemPageVM;
    return getResourceContent(itemPage);
  }

  getAboutItem(): AboutItemModel | undefined {
    const aboutItem = this.state.aboutThisItem;
    return getResourceContent(aboutItem);
  }

  getItemAccessibility(): AccResourceGroupModel[] | undefined {
    const itemAcc = this.state.itemAccessibility;
    return getResourceContent(itemAcc);
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
      this.updateCookie(itemPage.accessibilityCookieName, newGroups);
    } else {
      console.error("Error no item to update resources");
    }
  };

  updateCookie(cookieName: string, accGroups?: AccResourceGroupModel[]): void {
    const cookieValue = accGroups ? toCookie(accGroups) : "";
    document.cookie = cookieName.concat("=", cookieValue, "; path=/");
  }

  onReset = () => {
    const itemPage = this.getItemPage();
    const itemAcc = this.getItemAccessibility();
    if (itemPage && itemAcc) {
      const newItemPage = { ...itemPage };

      this.updateCookie(newItemPage.accessibilityCookieName);

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

  onFetchUpdatedAboutError(err: any) {
    console.error(err);
    this.setState({
      aboutThisItem: { kind: "failure" }
    });
  }

  render() {
    const aboutThisItem = this.getAboutItem();
    const itemDetails = this.state.currentItem;
    const itemPage = this.getItemPage();
    const itemAccessibility = this.getItemAccessibility();

    if (aboutThisItem && itemPage && itemDetails && itemAccessibility) {
      return (
        <div className="item-page">
          <ItemPage
            {...itemPage}
            aboutThisItemVM={aboutThisItem}
            onSave={this.onSave}
            onReset={this.onReset}
            currentItem={itemDetails}
            accResourceGroups={itemAccessibility}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}
