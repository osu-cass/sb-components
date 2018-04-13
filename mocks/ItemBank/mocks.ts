import {
  AccessibilityRevisionModel,
  ItemRevisionModel,
  SectionModel,
  AccResourceGroupModel,
  AboutItemRevisionModel,
  RevisionModel
} from "@src/index";
import { mockPromise, mockPromiseReject } from "@mocks/promise";
import { allAccessibilityResourceGroups } from "@mocks/Accessibility/mocks";
import { aboutItemRevisionMockModel } from "@mocks/AboutItem/mocks";
import { mockRevisions } from "@mocks/Revisions/RevisionMocks";

export const mockBankAccessibilityClient = (acc: AccessibilityRevisionModel) =>
  mockPromise<AccResourceGroupModel[]>(allAccessibilityResourceGroups);

export const mockBankAboutItemClient = (item: ItemRevisionModel) =>
  mockPromise<AboutItemRevisionModel>(aboutItemRevisionMockModel);

export const mockBankAboutItemClientFail = (item: ItemRevisionModel) =>
  mockPromiseReject<AboutItemRevisionModel>("bad about item");

export const mockBankRevisionsClient = (item: ItemRevisionModel) =>
  mockPromise<RevisionModel[]>(mockRevisions);

export const mockBankRevisionsClientFail = (item: ItemRevisionModel) =>
  mockPromiseReject<RevisionModel[]>("bad revision item");

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

export const itemRevisionMocksError: ItemRevisionModel[] = [
  { bankKey: 187, itemKey: 1111, section: "siw", valid: false },
  { bankKey: 1872, itemKey: 2222, section: "math" },
  {}
];
