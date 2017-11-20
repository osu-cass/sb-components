import { Link } from "react-router-dom";
import * as GradeLevels from "../GradeLevels/GradeLevels";

export function itemPageLink(bankKey: number, itemKey: number) {
  window.location.href = "/Item?bankKey=" + bankKey + "&itemKey=" + itemKey;
}

export interface ItemCardModel {
  bankKey: number;
  itemKey: number;
  title: string;
  grade: GradeLevels.GradeLevels;
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
  brailleOnlyItem?: boolean,
  domain?: string,
  depthOfKnowledge?: string,
  commonCoreStandardId?: string
}
