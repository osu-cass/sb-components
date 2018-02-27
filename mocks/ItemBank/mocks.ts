import {
  AccessibilityRevisionModel,
  ItemRevisionModel,
  SectionModel
} from "src/ItemBank/ItemBankModels";
import { mockPromise } from "mocks/promise";
import { allAccessibilityResourceGroups } from "mocks/Accessibility/mocks";
import { AccResourceGroupModel, AboutItemRevisionModel } from "src/index";
import { aboutItemRevisionMockModel } from "mocks/AboutItem/mocks";
import { RevisionModel } from "src/Revisions/Revision";

export const mockBankAccessibilityClient = (acc: AccessibilityRevisionModel) =>
  mockPromise<AccResourceGroupModel[]>(allAccessibilityResourceGroups);

export const mockBankAboutItemClient = (item: ItemRevisionModel) =>
  mockPromise<AboutItemRevisionModel>(aboutItemRevisionMockModel);

export const mockBankRevisionsClient = (item: ItemRevisionModel) =>
  mockPromise<RevisionModel[]>([]);

export const mockBankSectionsClient = () =>
  mockPromise<SectionModel[]>(sectionMocks);

const sectionMocks: SectionModel[] = [
  {
    key: "siw",
    value: "siw"
  },
  {
    key: "math",
    value: "math"
  }
];
