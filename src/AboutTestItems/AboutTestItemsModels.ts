import { AboutItemModel } from "src/index";
import { get } from "src/ApiModel";

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

export interface AboutTestItemsParams {
  itemType?: string;
}

export const aboutTestItemsClient = (params?: {
  interactionTypeCode: string;
}) => get<AboutTestItemsModel>("/AboutItems/GetItemUrl", params);
