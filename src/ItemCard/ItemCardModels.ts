import { GradeLevels } from "../GradeLevels/GradeLevels";

export interface ItemCardModel {
  selected?: boolean;
  bankKey: number;
  itemKey: number;
  title: string;
  grade: GradeLevels;
  gradeLabel: string;
  subjectCode: string;
  subjectLabel: string;
  claimCode: string;
  claimLabel: string;
  targetHash: number;
  targetShortName: string;
  targetId: string;
  targetDescription: string;
  interactionTypeCode: string;
  interactionTypeLabel: string;
  isPerformanceItem: boolean;
  brailleOnlyItem?: boolean;
  domain?: string;
  depthOfKnowledge?: string;
  commonCoreStandardId?: string;
  ccssDescription?: string;
  calculator?: boolean;
}

export function itemIdEqual(a: ItemCardModel, b: ItemCardModel) {
  return a.itemKey === b.itemKey && a.bankKey === b.bankKey;
}
