import * as React from "react";
import { AboutItemModel, Resource, AboutTestItemsModel, InteractionTypeModel, AboutTestItemsParams, AboutTestSearchParams } from "@src/index";
export interface AboutTestItemContainerState {
    selectedCode?: string;
    itemUrl?: string;
    aboutThisItemViewModel: Resource<AboutItemModel>;
    aboutItemsViewModel: Resource<AboutTestItemsModel>;
    hasError: boolean;
}
export interface AboutTestItemContainerProps {
    params: AboutTestItemsParams;
    aboutClient: (params?: AboutTestSearchParams) => Promise<AboutTestItemsModel>;
    showRubrics: boolean;
    errorRedirectPath: string;
}
export declare class AboutTestItemsContainer extends React.Component<AboutTestItemContainerProps, AboutTestItemContainerState> {
    private subscription;
    constructor(props: AboutTestItemContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleChange: (newCode: string) => void;
    fetchUpdatedViewModel(newCode?: string): Promise<AboutTestItemsModel | undefined>;
    onError(err: string): void;
    onFetchedUpdatedViewModel(viewModel: AboutTestItemsModel): void;
    renderDescription(interactionTypes: InteractionTypeModel[]): JSX.Element | undefined;
    renderInteractionTypesSelect(interactionTypes: InteractionTypeModel[]): JSX.Element;
    renderNoItem(): JSX.Element;
    renderItemFrame(): JSX.Element;
    private renderItemTypesGroup();
    private renderError();
    isLoading(): boolean;
    render(): JSX.Element;
}
