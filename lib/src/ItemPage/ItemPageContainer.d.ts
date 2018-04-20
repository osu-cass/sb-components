import * as React from "react";
import { AccResourceGroupModel, AboutItemModel, ItemModel, ItemIsaapModel, ItemPageModel, ItemIdentifierModel, Resource } from "@src/index";
export interface ItemPageContainerProps {
    aboutThisClient: (params: ItemModel) => Promise<AboutItemModel>;
    itemPageClient: (params: ItemModel) => Promise<ItemPageModel>;
    itemAccessibilityClient: (params: ItemIsaapModel) => Promise<AccResourceGroupModel[]>;
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
export declare class ItemPageContainer extends React.Component<ItemPageContainerProps, ItemPageContainerState> {
    private subscription;
    constructor(props: ItemPageContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    fetchItemPage(item: ItemModel): void;
    componentWillReceiveProps(nextProps: ItemPageContainerProps): void;
    private setCurrentItem();
    onGetItemPage(data: ItemPageModel): void;
    onGetItemAccessibility(data: AccResourceGroupModel[]): void;
    onError(err: string): void;
    private getItemPage();
    private getAboutItem();
    private getItemAccessibility();
    onSave: (newGroups: AccResourceGroupModel[]) => void;
    updateIsaapHandler(resources: AccResourceGroupModel[]): void;
    updateIsaapCookieHandler(accGroups?: AccResourceGroupModel[]): void;
    onReset: () => void;
    fetchUpdatedAboutThisItem(): void;
    onFetchedUpdatedViewModel(viewModel: AboutItemModel): void;
    onFetchUpdatedAboutError(err: string): void;
    render(): JSX.Element;
}
