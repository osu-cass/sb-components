import { aboutItemMockModel, defaultAboutTestItemsModel } from "mocks/index";
import {
  AboutTestSearchParams,
  AboutTestItemsModel,
  AboutItemModel,
  InteractionTypeModel
} from "../../index";

export const werAboutItem = {
  ...defaultAboutTestItemsModel,
  selectedInteractionTypeCode: "WER"
};

export const mockedAboutClient = jest.fn(
  (params?: AboutTestSearchParams) => werAboutItem
);
