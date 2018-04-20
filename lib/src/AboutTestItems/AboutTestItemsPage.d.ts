import * as React from "react";
import { AboutTestItemsModel, AboutTestItemsParams } from "./AboutTestItemsModels";
import { RouteComponentProps } from "react-router";
/**
 * Entry point for About Test Items
 * Requires router params
 * @interface AboutTestItemsPageProps
 * @extends {RouteComponentProps<AboutTestItemsParams>}
 */
export interface AboutTestItemsPageProps extends RouteComponentProps<AboutTestItemsParams> {
    aboutClient: (params?: {
        interactionTypeCode: string;
    }) => Promise<AboutTestItemsModel>;
    showRubrics: boolean;
    appName?: string;
    errorRedirectPath: string;
}
export declare class AboutTestItemsPage extends React.Component<AboutTestItemsPageProps, {}> {
    constructor(props: AboutTestItemsPageProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
