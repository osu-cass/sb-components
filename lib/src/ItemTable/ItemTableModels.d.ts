import { ItemCardModel } from "../ItemCard/ItemCardModels";
export declare type HeaderType = "Item" | "Claim/Target" | "Subject" | "Grade" | "Item Type";
export declare enum SortDirection {
    NoSort = 0,
    Ascending = 1,
    Descending = -1,
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
export declare const headerColumns: ColumnGroup[];
