import { ItemCardModel } from "@src/index";

export interface Column {
  label: string;
  itemCards: ItemCardModel[];
}

export interface MoreLikeThisModel {
  gradeBelowItems: Column | null;
  sameGradeItems: Column;
  gradeAboveItems: Column | null;
  showModal?: boolean;
}
