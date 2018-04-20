import * as React from "react";
import { ItemPdfModel } from "./PdfModels";
export interface ItemViewProps {
    view: ItemPdfModel;
}
export declare class ItemView extends React.Component<ItemViewProps, {}> {
    render(): JSX.Element | undefined;
}
