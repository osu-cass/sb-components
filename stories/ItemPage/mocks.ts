import { ItemPageProps } from "../../src/ItemPage/ItemPage";
import { ItemPageContainerProps } from "../../src/ItemPage/ItemPageContainer"
import { AboutItemModel } from "../../src/AboutItem/AboutItemModels";
import { ItemModel, ItemPageModel, ItemIsaapModel, } from "../../src/ItemPage/ItemPageModels";
import { AccResourceGroupModel, ResourceSelectionsModel } from "../../src/Accessibility/AccessibilityModels";
import { AboutItemMockModel } from "../AboutItem/mocks";
import * as H from 'history';
import {allAccessibilityResourceGroups} from "../Accessibility/AccessibilityOptionsMock";

export const aboutThisClient = ( params: ItemModel ) =>
    new Promise<AboutItemModel>(
        () => jest.fn()
    );
export const itemPageClient = ( params: ItemModel ) => new Promise<ItemPageModel>(
    () => jest.fn()
);

export const itemAccessibilityClient = ( params: ItemIsaapModel ) => new Promise<AccResourceGroupModel[]>(
    () => { return ItemPageMockProps.accResourceGroups }
);

export const ItemPageContainerMockProps: ItemPageContainerProps = {
    aboutThisClient,
    itemPageClient,
    itemAccessibilityClient
}

export const onSave = ( ( selections: ResourceSelectionsModel ) => { } ) as ( ( selections: ResourceSelectionsModel ) => void );

export const onReset = ( () => { } ) as ( () => void );

export const ItemPageMockProps: ItemPageProps = {
    onSave,
    onReset,
    aboutThisItemVM: AboutItemMockModel,
    currentItem: {
        itemName: '187-3000',
        itemKey: 3000,
        bankKey: 187
    },
    accResourceGroups: allAccessibilityResourceGroups,
    itemViewerServiceUrl: 'http://ivs.smarterbalanced.org/',
    itemNames: '187-3000',
    brailleItemNames: '187-3000',
    nonBrailleItem: {
        itemName: '187-3000',
        itemKey: 3000,
        bankKey: 187
    },
    brailleItem: {
        itemName: '187-3000',
        itemKey: 3000,
        bankKey: 187
    },
    accessibilityCookieName: 'accessibilityCookie',
    isPerformanceItem: false,
    moreLikeThisVM: {
        gradeBelowItems: {
            label: 'Grade 5',
            itemCards: []
        },
        sameGradeItems: {
            label: 'Grade 6',
            itemCards: []
        },
        gradeAboveItems: {
            label: 'Grade 7',
            itemCards: []
        }
    },
    performanceItemDescription: '',
    subject: 'ELA',
    brailleItemCodes: [
        'TDS_BT_ECL',
        'TDS_BT_ECN',
        'TDS_BT_EXL',
        'TDS_BT_EXN',
        'TDS_BT_UCL',
        'TDS_BT_UXL'
    ],
    braillePassageCodes: [],
    defaultIsaapCodes: 'TDS_ITM1;TDS_APC_SCRUBBER;'
}

export const ItemPageMockPropsNoItem: ItemPageProps = {
    onSave,
    onReset,
    aboutThisItemVM: AboutItemMockModel,
    itemViewerServiceUrl: 'http://ivs.smarterbalanced.org/',
    itemNames: '',
    brailleItemNames: '',
    nonBrailleItem: {
        itemName: '',
        itemKey: 0,
        bankKey: 0
    },
    brailleItem: {
        itemName: '',
        itemKey: 0,
        bankKey: 0
    },
    accResourceGroups: [] as AccResourceGroupModel[],
    currentItem:  {
        itemName: '',
        itemKey: 0,
        bankKey: 0
    },
    accessibilityCookieName: 'accessibilityCookie',
    isPerformanceItem: false,
    moreLikeThisVM: {
        gradeBelowItems: {
            label: 'Grade 5',
            itemCards: []
        },
        sameGradeItems: {
            label: 'Grade 6',
            itemCards: []
        },
        gradeAboveItems: {
            label: 'Grade 7',
            itemCards: []
        }
    },
    performanceItemDescription: '',
    subject: 'ELA',
    brailleItemCodes: [
        'TDS_BT_ECL',
        'TDS_BT_ECN',
        'TDS_BT_EXL',
        'TDS_BT_EXN',
        'TDS_BT_UCL',
        'TDS_BT_UXL'
    ],
    braillePassageCodes: [],
    defaultIsaapCodes: 'TDS_ITM1;TDS_APC_SCRUBBER;'
}