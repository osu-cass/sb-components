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
  col: ColumnGroup;
  direction: SortDirection;
  resetSortCount: number;
}

export interface SortColumnModel {
  className: string;
  accessor: (label: ItemCardModel) => string | number;
  helpText?: (label: ItemCardModel) => string;
}

export interface ColumnGroup {
  header: HeaderType;
  headerClassName: string;
  cols: SortColumnModel[];
  compare: (a: ItemCardModel, b: ItemCardModel) => number;
  headerHelp?: string;
}

export const headerColumns: ColumnGroup[] = [
  {
    header: "Item",
    headerClassName: "item",
    compare: (a, b) => a.itemKey - b.itemKey,
    cols: [
      {
        accessor: label => label.itemKey,
        className: "item"
      }
    ]
  },
  {
    header: "Subject",
    headerClassName: "subject",
    cols: [{ accessor: label => label.subjectLabel, className: "subject" }],
    compare: (a, b) => a.subjectCode.localeCompare(b.subjectCode)
  },
  {
    header: "Grade",
    headerClassName: "grade",
    cols: [
      {
        accessor: label => label.gradeLabel,
        className: "grade"
      }
    ],
    compare: (a, b) => a.grade - b.grade
  },
  {
    header: "Claim/Target",
    headerClassName: "claimAndTarget",
    cols: [
      {
        accessor: card => card.claimLabel,
        className: "claim"
      },
      {
        accessor: card => card.targetId,
        className: "target",
        helpText: card => card.targetDescription
      }
    ],
    compare: (a, b) => {
      let direction;
      if (a.claimCode < b.claimCode || a.targetId < b.targetId) {
        direction = SortDirection.Ascending;
      } else if (a.claimCode > b.claimCode || a.targetId > b.targetId) {
        direction = SortDirection.Descending;
      } else {
        direction = SortDirection.NoSort;
      }

      return direction;
    }
  },
  {
    header: "Item Type",
    headerClassName: "item-type",
    cols: [
      {
        accessor: label => label.interactionTypeLabel,
        className: "item-type"
      }
    ],
    compare: (a, b) =>
      a.interactionTypeCode.localeCompare(b.interactionTypeCode)
  }
];
