import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { AccessibilityResourceModel, AccResourceGroupModel } from "../Accessibility/AccessibilityModels";
import { MoreLikeThisModel } from "../Modals/MoreLikeThisModels";
export interface ItemIdentifierModel extends ItemModel {
    itemName: string;
}
export interface ItemModel {
    bankKey: number;
    itemKey: number;
}
export interface ItemIsaapModel extends ItemModel {
    isaap?: string;
}
export interface ItemPageModel {
    itemViewerServiceUrl: string;
    itemNames: string;
    brailleItemNames: string;
    brailleItem: ItemIdentifierModel;
    nonBrailleItem: ItemIdentifierModel;
    accessibilityCookieName: string;
    isPerformanceItem: boolean;
    performanceItemDescription: string;
    subject: string;
    moreLikeThisVM: MoreLikeThisModel;
    brailleItemCodes: string[];
    braillePassageCodes: string[];
    defaultIsaapCodes: string;
}
export declare function toiSAAP(accResourceGroups: AccResourceGroupModel[], defaultIsaap?: string): string;
export declare function resetResource(model: AccessibilityResourceModel): AccessibilityResourceModel;
export declare function trimAccResource(resource: AccessibilityResourceModel): {
    label: string;
    selectedCode: string;
};
export declare function toCookie(accGroups: AccResourceGroupModel[]): string;
export declare const aboutThisItemViewModelClient: (params: ItemModel) => Promise<AboutItemModel>;
export declare const itemPageClient: (params: ItemModel) => Promise<ItemPageModel>;
export declare const itemAccessibilityClient: (params: ItemIsaapModel) => Promise<AccResourceGroupModel[]>;
