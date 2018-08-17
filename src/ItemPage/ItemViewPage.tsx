import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";
import {
  AccResourceGroupModel,
  AboutItemModel,
  ItemModel,
  ItemIsaapModel,
  ItemPageModel,
  parseQueryString,
  ItemPageContainer
} from "@src/index";

export interface ItemViewPageProps extends RouteComponentProps<ItemModel> {
  aboutThisClient: (params: ItemModel) => Promise<AboutItemModel>;
  itemPageClient: (params: ItemModel) => Promise<ItemPageModel>;
  itemAccessibilityClient: (
    params: ItemIsaapModel
  ) => Promise<AccResourceGroupModel[]>;
  showRubrics: boolean;
  appName?: string;
  errorRedirectPath: string;
}

export class ItemViewPage extends React.Component<ItemViewPageProps, {}> {
  constructor(props: ItemViewPageProps) {
    super(props);
  }

  componentDidMount() {
    const { appName } = this.props;

    if (appName) {
      document.title = `Item Details - Smarter Balanced ${appName}`;
    }
  }

  getLocationIsaap() {
    const query = parseQueryString(this.props.location.search);

    /*tslint:disable: no-string-literal  */
    return (query["isaap"] || [])[0] || "";
  }

  updateLocationIsaap = (isaap: string) => {
    try {
      const location = {
        ...this.props.history.location,
        search: `isaap=${isaap}`
      };
      this.props.history.replace(location);
    } catch (exception) {
      throw new Error(`unable to update url ${exception}`);
    }
  };

  getIsaapModel(): ItemIsaapModel {
    const itemParams: ItemModel = { ...this.props.match.params };
    const isaap = this.getLocationIsaap() || "";

    return {
      ...itemParams,
      isaap
    };
  }

  updateIsaapCookie = (cookieName: string, cookieValue: string) => {
    document.cookie = cookieName.concat("=", cookieValue, "; path=/");
  };

  render() {
    const itemIsaap = this.getIsaapModel();

    return (
      <ItemPageContainer
        {...this.props}
        itemIsaap={itemIsaap}
        updateIsaap={this.updateLocationIsaap}
        updateCookie={this.updateIsaapCookie}
      />
    );
  }
}
