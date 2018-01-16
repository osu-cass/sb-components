import * as H from "history";
import { match } from "react-router";
import {
  ItemViewerContainerProps,
  ItemViewContainerProps,
  ItemModel,
  ItemPageModel,
  ItemIsaapModel,
  AccResourceGroupModel,
  AboutItemModel
} from "src/index";
import { ResourceSelectionsModel } from "src/Accessibility/AccessibilityModels";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { allAccessibilityResourceGroups } from "mocks/Accessibility/mocks";
import { mockPromise } from "mocks/promise";

export const aboutThisClient = (params: ItemModel) =>
  mockPromise(AboutItemMockModel);

export const itemPageClient = (params: ItemModel) =>
  mockPromise<ItemPageModel>(itemPageModelMock);

export const itemAccessibilityClient = (params: ItemIsaapModel) =>
  mockPromise(itemPageMockProps.accResourceGroups);

export const itemPagePath = "/:bankKey:itemKey";

export const itemPageMatch: match<ItemModel> = {
  params: { bankKey: 187, itemKey: 4000 },
  isExact: true,
  path: "itemPagePath",
  url: "/"
};

export const onSave = ((selections: ResourceSelectionsModel) => {}) as ((
  selections: ResourceSelectionsModel
) => void);

export const onReset = () => {};

export const itemPageModelMock: ItemPageModel = {
  itemViewerServiceUrl: "http://ivs.smarterbalanced.org/",
  itemNames: "187-3000",
  brailleItemNames: "187-3000",
  nonBrailleItem: {
    itemName: "187-3000",
    itemKey: 3000,
    bankKey: 187
  },
  brailleItem: {
    itemName: "187-3001",
    itemKey: 3001,
    bankKey: 187
  },
  accessibilityCookieName: "accessibilityCookie",
  isPerformanceItem: false,
  moreLikeThisVM: {
    gradeBelowItems: {
      label: "Grade 5",
      itemCards: []
    },
    sameGradeItems: {
      label: "Grade 6",
      itemCards: []
    },
    gradeAboveItems: {
      label: "Grade 7",
      itemCards: []
    }
  },
  performanceItemDescription: "",
  subject: "ELA",
  brailleItemCodes: [
    "TDS_BT_ECL",
    "TDS_BT_ECN",
    "TDS_BT_EXL",
    "TDS_BT_EXN",
    "TDS_BT_UCL",
    "TDS_BT_UXL"
  ],
  braillePassageCodes: [],
  defaultIsaapCodes: "TDS_ITM1;TDS_APC_SCRUBBER;"
};

export const itemPageMockProps: ItemViewerContainerProps = {
  ...itemPageModelMock,
  onSave,
  onReset,
  showRubrics: true,
  aboutThisItemVM: AboutItemMockModel,
  currentItem: {
    itemName: "187-3000",
    itemKey: 3000,
    bankKey: 187
  },
  accResourceGroups: allAccessibilityResourceGroups
};

export const ItemPageMockPropsNoItem: ItemViewerContainerProps = {
  onSave,
  onReset,
  showRubrics: true,
  aboutThisItemVM: AboutItemMockModel,
  itemViewerServiceUrl: "http://ivs.smarterbalanced.org/",
  itemNames: "",
  brailleItemNames: "",
  nonBrailleItem: {
    itemName: "",
    itemKey: 0,
    bankKey: 0
  },
  brailleItem: {
    itemName: "",
    itemKey: 0,
    bankKey: 0
  },
  accResourceGroups: [] as AccResourceGroupModel[],
  currentItem: {
    itemName: "",
    itemKey: 0,
    bankKey: 0
  },
  accessibilityCookieName: "accessibilityCookie",
  isPerformanceItem: false,
  moreLikeThisVM: {
    gradeBelowItems: {
      label: "Grade 5",
      itemCards: []
    },
    sameGradeItems: {
      label: "Grade 6",
      itemCards: []
    },
    gradeAboveItems: {
      label: "Grade 7",
      itemCards: []
    }
  },
  performanceItemDescription: "",
  subject: "ELA",
  brailleItemCodes: [
    "TDS_BT_ECL",
    "TDS_BT_ECN",
    "TDS_BT_EXL",
    "TDS_BT_EXN",
    "TDS_BT_UCL",
    "TDS_BT_UXL"
  ],
  braillePassageCodes: [],
  defaultIsaapCodes: "TDS_ITM1;TDS_APC_SCRUBBER;"
};
