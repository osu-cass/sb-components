import * as React from "react";
import { HeaderSortModel, ColumnGroup } from "@src/index";
/**
 * Properties for HeaderTable component
 * @interface HeaderTableProps
 */
export interface HeaderTableProps {
    columns: ColumnGroup[];
    onHeaderClick: (header: ColumnGroup) => void;
    sorts: HeaderSortModel[];
    isLinkTable: boolean;
}
/**
 * HeaderTable creates a table header based on the passed in columns
 * The HeaderTable, when clicked, will add the clicked column header
 * the parent, ItemTableContainer, state, sorting the table
 */
export declare class HeaderTable extends React.Component<HeaderTableProps, {}> {
    constructor(props: HeaderTableProps);
    /**
     * Send the clicked sort column to the parent to be added to the sorts list
     * using onHeaderClick prop.
     * @param {ColumnGroup} sCol
     * @param {(HeaderSortModel | undefined)} hCol
     */
    headerClickHandler: (sCol: ColumnGroup, hCol?: HeaderSortModel | undefined) => void;
    /**
     * Send the clicked sort column to the parent to be added to the sorts list
     * using onHeaderClick prop.
     * @param {React.KeyboardEvent<any>} e
     * @param {HeaderColumnModel} sCol
     * @param {(HeaderSortModel | undefined)} hCol
     */
    headerKeyUpHandler: (e: React.KeyboardEvent<HTMLTableHeaderCellElement>, sCol: ColumnGroup, hCol?: HeaderSortModel | undefined) => void;
    /**
     * Assigns an ascending or descending arrow character to the visible column
     * header when clicked, denoting how it is sorted
     * @param {(HeaderSortModel | undefined)} headerSort
     * @returns {JSX.Element}
     */
    setDirElem(headerSort: HeaderSortModel | undefined): JSX.Element;
    /**
     * Renders a single table header element and the corresponding ascending, descending,
     * or 'not-sorted' symbol
     * @param {ColumnGroup} col
     * @returns {JSX.Element}
     */
    renderHeader(col: ColumnGroup): JSX.Element;
    render(): JSX.Element;
}
