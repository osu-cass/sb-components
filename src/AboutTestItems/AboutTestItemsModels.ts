import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { get } from "../ApiModel";

export interface InteractionTypeModel {
  code: string;
  label: string;
  description?: string;
  order?: number;
}

export interface AboutTestItemsModel {
  interactionTypes: InteractionTypeModel[];
  itemUrl: string;
  selectedInteractionTypeCode: string;
  aboutThisItemViewModel: AboutItemModel;
}

export const aboutTestItemsClient = (params?: {
  interactionTypeCode: string;
}) => get<AboutTestItemsModel>("/AboutItems/GetItemUrl", params);
