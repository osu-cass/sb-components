import { aboutItemMockModel, defaultAboutTestItemsModel } from "@mocks/index";
import {
  AboutTestSearchParams,
  AboutTestItemsModel,
  AboutItemModel,
  InteractionTypeModel
} from "@src/index";

export const werAboutItem = {
  ...defaultAboutTestItemsModel,
  selectedInteractionTypeCode: "WER"
};

export const mockedAboutClient = jest.fn(
  (params?: AboutTestSearchParams) => werAboutItem
);
