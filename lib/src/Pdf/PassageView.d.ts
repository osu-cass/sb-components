import * as React from "react";
import { ItemPdfModel } from "./PdfModels";
export interface PassageViewProps {
    view: ItemPdfModel;
    associatedItems: string[];
}
export declare class PassageView extends React.Component<PassageViewProps, {}> {
    render(): JSX.Element;
}
