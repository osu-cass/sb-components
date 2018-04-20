import { DropDownSelectionModel } from "../DropDown/DropDownModels";
export interface AccessibilityResourceModel {
    resourceCode: string;
    defaultSelection: string;
    description: string;
    disabled: boolean;
    label: string;
    currentSelectionCode: string;
    order: number;
    selections: DropDownSelectionModel[];
}
export interface AccResourceGroupModel {
    label: string;
    order: number;
    accessibilityResources: AccessibilityResourceModel[];
}
export interface ResourceSelectionsModel {
    [resourceName: string]: string;
}
export declare function getResource(resourceCode: string, resourceGroups: AccResourceGroupModel[]): AccessibilityResourceModel | undefined;
export declare function getBrailleAccommodation(accResourceGroups: AccResourceGroupModel[]): string;
export declare function isBrailleEnabled(accResourceGroups: AccResourceGroupModel[]): boolean;
export declare function isCalculatorEnabled(accResourceGroups: AccResourceGroupModel[]): boolean;
export declare function isResourceEnabled(accResourceGroups: AccResourceGroupModel[], resourceCode: string): boolean;
export declare function getResouceSelectedCode(resourceCode: string, accResourceGroups: AccResourceGroupModel[]): string | undefined;
export declare function isStreamlinedEnabled(accResourceGroups: AccResourceGroupModel[]): boolean;
export declare function getResourceTypes(resourceGroups: AccResourceGroupModel[]): string[];
export declare function updateAccessibilityGroups(selections: ResourceSelectionsModel, accGroups: AccResourceGroupModel[]): AccResourceGroupModel[];
