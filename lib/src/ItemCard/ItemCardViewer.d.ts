import * as React from "react";
import { Tabs, AboutItemModel } from "@src/index";
export interface ItemCardViewerProps {
    item?: AboutItemModel;
}
export interface State {
    selectedTab: Tabs;
}
export declare class ItemCardViewer extends React.Component<ItemCardViewerProps, State> {
    constructor(props: ItemCardViewerProps);
    onTabChange(tab: Tabs): void;
    renderViewer(url: string): JSX.Element;
    renderRubric(): JSX.Element | undefined;
    renderInformation(): JSX.Element | undefined;
    renderChosen(): JSX.Element | JSX.Element[] | undefined;
    render(): JSX.Element;
}
