import * as React from "react";
import { ItemGroupModel } from "./PdfModels";
export interface ItemViewContainerProps {
    itemData: ItemGroupModel;
    displayScoreInfo: boolean;
}
export declare class ItemViewContainer extends React.Component<ItemViewContainerProps, {}> {
    render(): JSX.Element;
}
