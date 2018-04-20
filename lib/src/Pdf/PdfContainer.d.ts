import * as React from "react";
import { ItemGroupModel } from "./PdfModels";
export interface PdfContainerProps {
    items: ItemGroupModel[];
    grade: string;
    subject: string;
    ivsBaseUrl: string;
    cssUrl: string;
    displayTitlePage: boolean;
    displayScoreInfo: boolean;
    port: string;
}
export declare class PdfContainer extends React.Component<PdfContainerProps, {}> {
    render(): JSX.Element;
}
