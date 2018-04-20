import * as React from "react";
import { ItemCardModel, AboutItemModel, Resource, HeaderSortModel, ColumnGroup } from "@src/index";
export interface ItemTableProps {
    cardRows: ItemCardModel[];
    onRowExpand: (item: ItemCardModel) => void;
    onRowSelect: (item: ItemCardModel) => void;
    sort: HeaderSortModel[];
    columns: ColumnGroup[];
    expandedRow?: ItemCardModel;
    item?: Resource<AboutItemModel>;
    isLinkTable: boolean;
}
/**
 * Renders the table populated from an array of ItemCardModels. Also renders an instance of the ItemCardViewer,
 * inserting a responsive sub-table with an iframe that displays the Item Card.
 * @class ItemTable
 * @extends {React.Component<ItemTableProps, {}>}
 */
export declare class ItemTable extends React.Component<ItemTableProps, {}> {
    constructor(props: ItemTableProps);
    renderAllRows(): JSX.Element[];
    renderExpandedRow(item: Resource<AboutItemModel>): JSX.Element | undefined;
    renderRow(rowData: ItemCardModel): JSX.Element[];
    render(): JSX.Element;
}
