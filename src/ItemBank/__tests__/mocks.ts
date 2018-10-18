import {
  AccessibilityRevisionModel,
  ItemRevisionModel,
  NamespaceModel,
  SectionModel,
  AccResourceGroupModel,
  AboutItemRevisionModel,
  RevisionModel
} from "@src/index";

import {
  allAccessibilityResourceGroups,
  aboutItemRevisionMockModel,
  mockRevisions,
  namespaceMocks,
  sectionMocks
} from "@mocks/index";

export const mockOnAccessibilityReset = jest.fn();
export const mockOnAccessibilityUpdate = jest.fn();
export const mockOnItemSelect = jest.fn();
export const mockOnRevisionSelect = jest.fn();
export const mockOnItemHandler = jest.fn();

export const mockAccessibility = allAccessibilityResourceGroups;

export const mockBankAccessibilityClient: (
  acc: AccessibilityRevisionModel
) => Promise<AccResourceGroupModel[]> = jest.fn(
  acc => allAccessibilityResourceGroups
);

export const mockBankAboutItemClient: (
  item: ItemRevisionModel
) => Promise<AboutItemRevisionModel> = jest.fn(
  item => aboutItemRevisionMockModel
);

export const mockResetUrl: () => {};

export const mockBankRevisionsClient: (
  item: ItemRevisionModel
) => Promise<RevisionModel[]> = jest.fn(item => mockRevisions);

export const mockBankSectionsClient: () => Promise<SectionModel[]> = jest.fn(
  item => sectionMocks
);
