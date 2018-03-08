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
import { mockRevisions } from "../Revisions/RevisionMocks";

export const mockBankAccessibilityClient = (acc: AccessibilityRevisionModel) =>
  mockPromise<AccResourceGroupModel[]>(allAccessibilityResourceGroups);

export const mockBankAboutItemClient = (item: ItemRevisionModel) =>
  mockPromise<AboutItemRevisionModel>(aboutItemRevisionMockModel);

export const mockBankRevisionsClient = (item: ItemRevisionModel) =>
  mockPromise<RevisionModel[]>(mockRevisions);

export const mockBankSectionsClient = () =>
  mockPromise<SectionModel[]>(sectionMocks);

export const sectionMocks: SectionModel[] = [
  {
    key: "SIW",
    value: "SIW"
  },
  {
    key: "MATH",
    value: "MATH"
  },
  {
    key: "IAT",
    value: "IAT"
  }
];

export const itemRevisionMocks: ItemRevisionModel[] = [
  { bankKey: 187, itemKey: 1111, section: "siw" },
  { bankKey: 1872, itemKey: 2222, section: "math" },
  { bankKey: 1871, itemKey: 3333, section: "siw" },
  {}
];
