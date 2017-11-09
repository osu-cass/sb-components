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
  targetHash: string;
  targetShortName: string;
  interactionTypeCode: string;
  interactionTypeLabel: string;
}
