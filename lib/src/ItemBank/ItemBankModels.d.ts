import { GradeLevel } from "@src/index";
export interface ItemRevisionModel {
    itemKey?: number;
    bankKey?: number;
    section?: string;
    revision?: string;
    isaap?: string;
    valid?: boolean;
}
export declare function getItemBankName(itemRevisionModel: ItemRevisionModel): string | undefined;
export declare function itemRevisionKey(itemRevisionModel: ItemRevisionModel): string;
export declare function validItemRevisionModel(itemRevisionModel?: ItemRevisionModel): boolean;
export declare function getItemBankIndex(currentItem: ItemRevisionModel, items: ItemRevisionModel[]): number;
export declare function getNextItemBank(currentItem: ItemRevisionModel, items: ItemRevisionModel[]): ItemRevisionModel | undefined;
export declare function getPreviousItemBank(currentItem: ItemRevisionModel, items: ItemRevisionModel[]): ItemRevisionModel | undefined;
export interface SectionModel {
    key: string;
    value: string;
}
export interface AccessibilityRevisionModel {
    gradeLevel: GradeLevel;
    subject: string;
    interactionType: string;
    allowCalculator?: boolean;
    isPerformance?: boolean;
}
