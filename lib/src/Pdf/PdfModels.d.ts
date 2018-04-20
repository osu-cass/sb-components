import { AboutItemModel } from "../AboutItem/AboutItemModels";
export interface ItemGroupModel {
    passage?: ItemPdfModel;
    questions: QuestionModel[];
}
export interface QuestionModel {
    id: string;
    view: ItemPdfModel;
    data?: AboutItemModel;
    questionNumber?: number;
}
export declare enum PdfViewType {
    picture = 0,
    html = 1,
}
export interface ItemPdfModel {
    id: string;
    html?: string;
    picturePath?: string;
    screenshotUrl?: string;
    captured: boolean;
    type: PdfViewType;
}
