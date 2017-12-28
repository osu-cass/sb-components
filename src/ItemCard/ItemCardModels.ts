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
  interactionTypeCode: string;
  interactionTypeLabel: string;
  isPerformanceItem: boolean;
  brailleOnlyItem?: boolean;
  domain?: string;
  depthOfKnowledge?: string;
  commonCoreStandardId?: string;
}
