import {
  AccessibilityRevisionModel,
  ItemRevisionModel,
  NamespaceModel,
  SectionModel,
  AccResourceGroupModel,
  AboutItemRevisionModel,
  RevisionModel,
  ItemExistsRequestModel,
  ItemExistsResponseModel
} from "@src/index";
import { mockPromise, mockPromiseReject } from "@mocks/promise";
import { allAccessibilityResourceGroups } from "@mocks/Accessibility/mocks";
import { aboutItemRevisionMockModel } from "@mocks/AboutItem/mocks";
import { mockRevisions } from "@mocks/Revisions/RevisionMocks";

export const mockBankItemExistsClient = (items: ItemExistsRequestModel[]) => {
  const result: ItemExistsResponseModel[] = [];
  items.forEach((item, index) => {
    if (index % 2 === 0) {
      result.push({
        ...item,
        exists: false,
        error: "Its Raining cats and Dogs"
      });
    } else {
      result.push({ ...item, exists: true });
    }
  });

  return mockPromise<ItemExistsResponseModel[]>(result);
};

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

export const mockBankNamespacesClient = () =>
  mockPromise<NamespaceModel[]>(namespaceMocks);

export const mockBankSectionsClient = () =>
  mockPromise<SectionModel[]>(sectionMocks);

export const namespaceMocks: NamespaceModel[] = [
  { hasBankKey: false, bankKey: 991, id: "37", name: "iat-staging" },
  { hasBankKey: true, bankKey: 0, id: "26", name: "ELA" },
  { hasBankKey: false, bankKey: 992, id: "19", name: "iat-uat" },
  { hasBankKey: false, bankKey: 990, id: "14", name: "iat-development" },
  { hasBankKey: true, bankKey: 0, id: "12", name: "itemreviewviewer" }
];

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
  {
    namespace: "itemreviewviewer",
    hasBankKey: true,
    bankKey: 187,
    itemKey: 1111,
    valid: true
  },
  {
    namespace: "itemreviewviewer",
    hasBankKey: true,
    bankKey: 1872,
    itemKey: 2222,
    valid: false
  },
  {
    namespace: "itemreviewviewer",
    hasBankKey: true,
    bankKey: 1871,
    itemKey: 3333
  },
  {}
];

export const itemRevisionMocksError: ItemRevisionModel[] = [
  {
    namespace: "itemreviewviewer",
    hasBankKey: true,
    bankKey: 187,
    itemKey: 1111,
    valid: false
  },
  {
    namespace: "itemreviewviewer",
    hasBankKey: true,
    bankKey: 1872,
    itemKey: 2222
  },
  {}
];
