import { AboutItemModel } from '../AboutItem/AboutItemModels';

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

export interface ItemPdfModel {
    id: string;
    html?: string;
    picturePath?: string;
    captured: boolean;
    type: PdfViewType;
}

export enum PdfViewType {
    picture,
    html
}
