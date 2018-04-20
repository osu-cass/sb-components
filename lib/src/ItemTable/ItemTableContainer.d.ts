import * as React from "react";
import { HeaderSortModel, ColumnGroup, ItemModel, Resource, ItemCardModel, AboutItemModel } from "@src/index";
/**
 * Properties for ItemTableContainer
 * @interface ItemTableContainerProps
 */
export interface ItemTableContainerProps {
    onRowSelection: (item: ItemModel, reset: boolean) => void;
    onItemSelection: (item: ItemCardModel) => void;
    itemCards?: ItemCardModel[];
    item?: Resource<AboutItemModel>;
    isLinkTable: boolean;
}
/**
 * State object interface for ItemTableContainer
 * @interface ItemTableContainerState
 */
export interface ItemTableContainerState {
    sorts: HeaderSortModel[];
    expandedRow?: ItemCardModel;
}
/**
 * Container for a table of Items that can be sorted by clicking on a table header.
 * When an item is clicked, it displays an iframe of that question.
 */
export declare class ItemTableContainer extends React.Component<ItemTableContainerProps, ItemTableContainerState> {
    private pageHeaderColumns;
    constructor(props: ItemTableContainerProps);
    /**
     * On header click, the column that was clicked will be added to the
     * sorts array in state or its sort status will be removed.
     * @memberOf {ItemTableContainer}
     * @function {onClickHeader}
     * @param {ColumnGroup} col
     */
    onClickHeader: (col: ColumnGroup) => void;
    /**
     * Sets the state with the currently selected item or removes
     * the selection from the item and removes it from state.
     * @function {handleExpandItem}
     * @param {ItemCardModel} item
     */
    handleExpandItem: (item: ItemCardModel) => void;
    handleSelectItem: (item: ItemCardModel) => void;
    /**
     * Sorts two ItemCardModels on the property specified by the sort parameter
     * @param {HeaderSortModel} sort
     * @param {ItemCardModel} lhs
     * @param {ItemCardModel} rhs
     */
    invokeMultiSort(sort: HeaderSortModel, lhs: ItemCardModel, rhs: ItemCardModel): number;
    /**
     * Sorts the data that is shown in the table on each of the 'sorts' that are
     * stored in state.
     * @function {getTableData}
     */
    getTableData: () => ItemCardModel[] | undefined;
    /**
     * Renders the HeaderTable component, the header to the ItemTable
     * @function {renderTableHeader}
     */
    renderTableHeader(): JSX.Element;
    /**
     * Renders the ItemTable component
     * @function {renderTable}
     */
    renderTable(): JSX.Element;
    render(): JSX.Element;
}
