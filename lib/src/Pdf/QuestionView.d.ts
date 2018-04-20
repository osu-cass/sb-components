import * as React from "react";
import { QuestionModel } from "./PdfModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
export interface QuestionViewProps {
    question: QuestionModel;
    displayScoreInfo: boolean;
}
export declare class QuestionView extends React.Component<QuestionViewProps, {}> {
    renderRubric(data?: AboutItemModel): JSX.Element | undefined;
    render(): JSX.Element;
}
