import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AccResourceGroupModel, AboutItemModel, ItemModel, ItemIsaapModel, ItemPageModel } from "@src/index";
export interface ItemViewPageProps extends RouteComponentProps<ItemModel> {
    aboutThisClient: (params: ItemModel) => Promise<AboutItemModel>;
    itemPageClient: (params: ItemModel) => Promise<ItemPageModel>;
    itemAccessibilityClient: (params: ItemIsaapModel) => Promise<AccResourceGroupModel[]>;
    showRubrics: boolean;
    appName?: string;
    errorRedirectPath: string;
}
export declare class ItemViewPage extends React.Component<ItemViewPageProps, {}> {
    constructor(props: ItemViewPageProps);
    componentDidMount(): void;
    getLocationIsaap(): string;
    updateLocationIsaap: (isaap: string) => void;
    getIsaapModel(): ItemIsaapModel;
    updateIsaapCookie: (cookieName: string, cookieValue: string) => void;
    render(): JSX.Element;
}
