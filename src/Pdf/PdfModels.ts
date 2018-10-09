import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { SubjectModel } from "../ItemSearch/ItemSearchModels";

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

export enum PdfViewType {
  picture,
  html
}

/* tslint:disable: no-reserved-keywords */
export interface ItemPdfModel {
  id: string;
  html?: string;
  picturePath?: string;
  screenshotUrl?: string;
  captured: boolean;
  type: PdfViewType;
}

export interface ScoreGuideViewModel {
  interactionTypes: InteractionTypeModel[];
  subjects: SubjectModel[];
}
