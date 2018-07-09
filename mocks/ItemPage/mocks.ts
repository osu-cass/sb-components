import * as H from "history";
import { match } from "react-router";
import {
  ItemViewerContainerProps,
  ItemViewContainerProps,
  ItemModel,
  ItemPageModel,
  ItemIsaapModel,
  AccResourceGroupModel,
  AboutItemModel,
  ResourceSelectionsModel,
  ItemPageContainerProps
} from "@src/index";
import { aboutItemMockModel } from "@mocks/AboutItem/mocks";
import { allAccessibilityResourceGroups } from "@mocks/Accessibility/mocks";
import { mockPromise } from "@mocks/promise";

export const aboutThisClient = (params: ItemModel) =>
  mockPromise(aboutItemMockModel);

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

// tslint:disable-next-line:no-empty
export const onSave = (accGRoups: AccResourceGroupModel[]) => {};

// tslint:disable-next-line:no-empty
export const onReset = () => {};

export const itemModelMock: ItemModel = {
  bankKey: 24,
  itemKey: 15
};

export const itemModelMockEmpty: ItemModel = {
  bankKey: 0,
  itemKey: 0
};

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
  aboutThisItemVM: aboutItemMockModel,
  currentItem: {
    itemName: "187-3000",
    itemKey: 3000,
    bankKey: 187
  },
  accResourceGroups: allAccessibilityResourceGroups
};

export const itemPageMockPropsNoItem: ItemViewerContainerProps = {
  onSave,
  onReset,
  showRubrics: true,
  aboutThisItemVM: aboutItemMockModel,
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

export const itemPageContainerPropsMock: ItemPageContainerProps = {
  aboutThisClient,
  itemPageClient,
  itemAccessibilityClient,
  showRubrics: true,
  itemIsaap: {
    ...itemModelMock,
    isaap: "Stuff and things"
  },
  updateIsaap: (isaap: string) => {
    return;
  },
  updateCookie: (cookieName: string, cookieValue: string) => {
    return;
  },
  errorRedirectPath: "stuff and things"
};

export const itemPageContainerPropsNoItemMock: ItemPageContainerProps = {
  aboutThisClient,
  itemPageClient,
  itemAccessibilityClient,
  showRubrics: true,
  itemIsaap: {
    ...itemModelMockEmpty,
    isaap: ""
  },
  updateIsaap: (isaap: string) => {
    return;
  },
  updateCookie: (cookieName: string, cookieValue: string) => {
    return;
  },
  errorRedirectPath: "Stuff and things"
};
