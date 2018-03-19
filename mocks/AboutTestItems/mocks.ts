import {
  Resource,
  AboutItemModel,
  AboutTestItemsModel,
  InteractionTypeModel,
  AboutTestItemsParams,
  AboutTestSearchParams
} from "@src/index";
import { completeItemCard } from "@mocks/ItemCard/mocks";
import { action } from "@storybook/addon-actions";
import { match } from "react-router";
import {
  aboutItemMockModel,
  mockPromiseLoading,
  mockPromiseReject
} from "@mocks/index";

const interactionTypes: InteractionTypeModel[] = [
  {
    code: "EBSR",
    label: "Evidence-Based Selected Response",
    description:
      "<p>This item presents students with a two-part question, parts A and B. \n              Students select a correct response from four options in Part A and then identify textual support for that response in Part B.</p>",
    order: 1
  },
  {
    code: "EQ",
    label: "Equation",
    description:
      "<p>The Equation item type has one or more text boxes for a response area and a key pad containing mathematical characters. \n              The student enters an equation or numerical answer into the text box using the key pad or keyboard.</p>",
    order: 2
  }
];

export const defaultAboutTestItemsModel: AboutTestItemsModel = {
  interactionTypes,
  itemUrl: "  ",
  aboutThisItemViewModel: aboutItemMockModel,
  selectedInteractionTypeCode: "EQ"
};

async function mockAboutClient(
  params?: AboutTestSearchParams
): Promise<AboutTestItemsModel> {
  const aboutItems = { ...defaultAboutTestItemsModel };
  if (params) {
    aboutItems.selectedInteractionTypeCode = params.interactionTypeCode;
  }

  return aboutItems;
}

export const mockAboutClientSuccess = mockAboutClient;

export const mockAboutRejectClient = (params?: AboutTestSearchParams) =>
  mockPromiseReject<AboutTestItemsModel>("Canceled");

export const mockAboutLoading = (params?: AboutTestSearchParams) =>
  mockPromiseLoading<AboutTestItemsModel>();

export const aboutTestPath = "/:itemType?";

export const aboutTestMatch: match<AboutTestItemsParams> = {
  params: { itemType: "EQ" },
  isExact: true,
  path: "aboutTestPath",
  url: "/"
};

export const aboutTestBadItem: match<AboutTestItemsParams> = {
  ...aboutTestMatch,
  params: { itemType: "somebadtype" }
};
