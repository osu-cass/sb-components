import * as ItemCard from "./ItemCard";
import * as ItemCardViewModel from './ItemCardViewModel';
import * as React from "react";

export type Header = "Item" | "Claim/Target" | "Subject" | "Grade" | "Item Type";

export enum SortDirection {
    NoSort = 0,
    Ascending = 1,
    Descending = -1
}

export interface HeaderSort {
    col: SortColumn;
    direction: SortDirection;
    resetSortCount: number;
}

export interface SortColumn {
    header: Header;
    className: string;
    accessor: (label: ItemCardViewModel.ItemCardViewModel) => string | number;
    compare: (a: ItemCardViewModel.ItemCardViewModel, b: ItemCardViewModel.ItemCardViewModel) => number;
}

const invokeResetSortLimit = 2;

const decendingArrow = (
    <span aria-label="Decend">▼</span>
);

const acendingArrow = (
    <span aria-label="Ascend">▲</span>
);

const noSort = (
    <span aria-label="NoSort"></span>
);

export const headerColumns: SortColumn[] = [
    {
        header: "Item",
        className: "item",
        accessor: label => label.itemKey,
        compare: (a, b) => (a.itemKey) - (b.itemKey)
    },
    {
        header: "Claim/Target",
        className: "claimAndTarget",
        accessor: label => label.claimLabel + "/" + label.target,
        compare: (a, b) => {
            if (a.claimCode < b.claimCode || a.target < b.target) {
                return 1
            }
            else if (a.claimCode > b.claimCode || a.target > b.target) {
                return -1
            }
            else {
                return 0;
            }
        }
    },
    {
        header: "Subject",
        className: "subject",
        accessor: label => label.subjectLabel,
        compare: (a, b) => (a.subjectCode).localeCompare(b.subjectCode)
    },
    {
        header: "Grade",
        className: "grade",
        accessor: label => label.gradeLabel,
        compare: (a, b) => (a.grade) - (b.grade)
    },
    {
        header: "Item Type",
        className: "interactionType",
        accessor: label => label.interactionTypeLabel,
        compare: (a, b) => (a.interactionTypeCode).localeCompare(b.interactionTypeCode)
    },
];

interface HeaderProps {
    columns: SortColumn[];
    onHeaderClick: (header: SortColumn) => void;
    sorts: HeaderSort[];
}

export class HeaderTable extends React.Component<HeaderProps, {}> {
    constructor(props: HeaderProps){
        super(props);
    }

    compareColumn(lhs: ItemCardViewModel.ItemCardViewModel, rhs: ItemCardViewModel.ItemCardViewModel): number {
        const sorts = this.props.sorts || [];
        for (const sort of sorts) {
            const diff = sort.col.compare(lhs, rhs) * sort.direction;
            if (diff !== 0) {
                return diff;
            }
        }
        return 0;
    }

    headerEventHandler(scol: SortColumn, hcol: HeaderSort|undefined) {
        this.props.onHeaderClick(scol);
    }

    renderHeader(col: SortColumn): JSX.Element {
        let dirElem: string | undefined | JSX.Element;
        const headerSort = this.props.sorts.find(hs => hs.col.header === col.header);
        if (!headerSort) {
            dirElem = noSort;
        } else if (headerSort.direction === SortDirection.Ascending) {
            dirElem = acendingArrow;
        } else if (headerSort.direction === SortDirection.Descending) {
            dirElem = decendingArrow;
        } else {
            dirElem = noSort;
        }

        return (
            <th key={col.header}
                className={col.className}
                onClick={() => this.headerEventHandler(col,headerSort)}>
                <div className={col.className}>
                    {dirElem} {col.header}
                </div>
            </th>
        );
    }

    render() {
        return (
            <table className="item-table table mapcomponent-table">
                <thead>
                    <tr className="primary">
                        <th></th>
                        {this.props.columns.map(col => this.renderHeader(col))}
                    </tr>
                </thead>
            </table>
        );
    }
}

interface Props {
    tableRef?: (ref: HTMLTableElement) => void;
    mapRows: ItemCardViewModel.ItemCardViewModel[];
    rowOnClick: (item: ItemCardViewModel.ItemCardViewModel) => void;
    sort: HeaderSort[];
    columns: SortColumn[];
    selectedRow?: ItemCardViewModel.ItemCardViewModel;
}

export class DataTable extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

   

    renderCell(col: SortColumn, cellData: ItemCardViewModel.ItemCardViewModel): JSX.Element {
        return (
            <td key={col.header}
                className={col.className}>
                <div className={col.className}>
                    {col.accessor(cellData)}
                </div>
            </td>
        );
    }

    //TODO replace X with checkmark icon 
    renderRow(rowData: ItemCardViewModel.ItemCardViewModel, index: number): JSX.Element {
        let isSelected = false;
        if (this.props.selectedRow) {
            isSelected = rowData.itemKey === this.props.selectedRow.itemKey
                        && rowData.bankKey === this.props.selectedRow.bankKey;
        }
        
        return (
            <tr key={index} className={isSelected ? "selected" : ""}
                onClick={() => {
                    this.props.rowOnClick(rowData);
                }}>
                <td>{isSelected ? "X" : ""}</td>
                {this.props.columns.map(col => this.renderCell(col, rowData))}
            </tr>
        );
    }

    renderRows(): JSX.Element {
        const rows = this.props.mapRows.map((rowData,idx) => this.renderRow(rowData,idx));
        return (
            <tbody>{rows}</tbody>
        );
    }

    render() {
        return (
            <table className="item-table table table-striped mapcomponent-table"
                ref={this.props.tableRef}>
                {this.renderRows()}
            </table>
        );
    }
}