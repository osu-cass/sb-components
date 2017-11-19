import { ItemCardModel } from "../ItemCard/ItemCardModels";

export type HeaderType =
  | "Item"
  | "Claim/Target"
  | "Subject"
  | "Grade"
  | "Item Type";

export enum SortDirection {
  NoSort = 0,
  Ascending = 1,
  Descending = -1
}

export interface HeaderSortModel {
  col: SortColumnModel;
  direction: SortDirection;
  resetSortCount: number;
}

export interface SortColumnModel {
  header: HeaderType;
  className: string;
  accessor: (label: ItemCardModel) => string | number;
  compare: (a: ItemCardModel, b: ItemCardModel) => number;
}

export const headerColumns: SortColumnModel[] = [
  {
    header: "Item",
    className: "item",
    accessor: label => label.itemKey,
    compare: (a, b) => a.itemKey - b.itemKey
  },
  {
    header: "Claim/Target",
    className: "claimAndTarget",
    accessor: label => label.claimLabel + "/" + label.targetShortName,
    compare: (a, b) => {
      if (a.claimCode < b.claimCode || a.targetShortName < b.targetShortName) {
        return SortDirection.Ascending;
      } else if (
        a.claimCode > b.claimCode ||
        a.targetShortName > b.targetShortName
      ) {
        return SortDirection.Descending;
      } else {
        return SortDirection.NoSort;
      }
    }
  },
  {
    header: "Subject",
    className: "subject",
    accessor: label => label.subjectLabel,
    compare: (a, b) => a.subjectCode.localeCompare(b.subjectCode)
  },
  {
    header: "Grade",
    className: "grade",
    accessor: label => label.gradeLabel,
    compare: (a, b) => a.grade - b.grade
  },
  {
    header: "Item Type",
    className: "interactionType",
    accessor: label => label.interactionTypeLabel,
    compare: (a, b) =>
      a.interactionTypeCode.localeCompare(b.interactionTypeCode)
  }
];
