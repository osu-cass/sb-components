import * as React from "react";
import * as ItemPageModels from "./ItemPageModels";
import { AboutItemModel, AccResourceGroupModel } from "@src/index";
export interface ItemViewerContainerProps extends ItemPageModels.ItemPageModel {
    onSave: (accGroups: AccResourceGroupModel[]) => void;
    onReset: () => void;
    aboutThisItemVM: AboutItemModel;
    currentItem: ItemPageModels.ItemIdentifierModel;
    accResourceGroups: AccResourceGroupModel[];
    showRubrics: boolean;
}
export declare class ItemViewerContainer extends React.Component<ItemViewerContainerProps, {}> {
    constructor(props: ItemViewerContainerProps);
    renderPerformanceModals(): JSX.Element | undefined;
    renderNav(): JSX.Element;
    renderCalculatorNav(): JSX.Element | undefined;
    renderBrailleNav(): JSX.Element | undefined;
    renderLeftNav(): JSX.Element;
    renderRightNav(): JSX.Element;
    renderIFrame(): JSX.Element;
    render(): JSX.Element;
}
