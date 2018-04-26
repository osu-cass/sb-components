import { AboutItemModel, getRequest } from "@src/index";

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

export interface AboutTestSearchParams {
  interactionTypeCode: string;
}

export const aboutTestItemsClient = (params?: {
  interactionTypeCode: string;
}) => getRequest<AboutTestItemsModel>("/AboutItems/GetItemUrl", params);
