import * as React from "react";
import { ItemCardModel, SortColumnModel, ColumnGroup } from "@src/index";
export interface ItemTableRowProps {
    rowData: ItemCardModel;
    hasControls: boolean;
    columns: ColumnGroup[];
    isExpanded: boolean;
    onRowExpand: (item: ItemCardModel) => void;
    onRowSelect: (item: ItemCardModel) => void;
}
export declare class ItemTableRow extends React.Component<ItemTableRowProps, {}> {
    constructor(props: ItemTableRowProps);
    shouldComponentUpdate(nextProps: ItemTableRowProps, nextState: {}): boolean;
    handleRowClick: (rowData: ItemCardModel) => void;
    handleKeyUpEnter: (e: React.KeyboardEvent<HTMLTableRowElement>, rowData: ItemCardModel) => void;
    handleCheckboxClick: (e: React.MouseEvent<HTMLTableDataCellElement>, rowData: ItemCardModel) => void;
    handleCheckboxKeyUpEnter: (e: React.KeyboardEvent<HTMLTableDataCellElement>, rowData: ItemCardModel) => void;
    renderColumnGroup(colGroup: ColumnGroup, cellData: ItemCardModel): JSX.Element;
    renderCell(col: SortColumnModel, cellData: ItemCardModel): JSX.Element;
    renderControls(): JSX.Element[] | undefined;
    render(): JSX.Element;
}
