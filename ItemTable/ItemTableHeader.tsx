import * as ItemCardViewModel from '../Models/ItemCardViewModel';
import * as React from "react";

export type Header = "Item" | "Claim/Target" | "Subject" | "Grade" | "Item Type";

export interface Props {
    columns: SortColumn[];
    onHeaderClick: (header: SortColumn) => void;
    sorts: HeaderSort[];
}

export interface State {
    dirElem: string | undefined | JSX.Element;
}

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
                return SortDirection.Ascending;
            }
            else if (a.claimCode > b.claimCode || a.target > b.target) {
                return SortDirection.Descending
            }
            else {
                return SortDirection.NoSort;
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

export class HeaderTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dirElem: undefined
        }
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

    headerEventHandler(scol: SortColumn, hcol: HeaderSort | undefined) {
        this.props.onHeaderClick(scol);
    }

    setDirElem(headerSort: HeaderSort) {
        let dirElem = undefined;
        if (!headerSort) {
            dirElem = noSort;
        } else if (headerSort.direction === SortDirection.Ascending) {
            dirElem = acendingArrow;
        } else if (headerSort.direction === SortDirection.Descending) {
            dirElem = decendingArrow;
        } else {
            dirElem = noSort;
        }

        this.setState({
            dirElem: dirElem
        })
    }

    renderHeader(col: SortColumn): JSX.Element {
        const headerSort = this.props.sorts.find(hs => hs.col.header === col.header);
        if (headerSort) {
            this.setDirElem(headerSort); 
        }

        return (
            <th key={col.header}
                className={col.className}
                onClick={() => this.headerEventHandler(col, headerSort)}>
                <div className={col.className}>
                    {this.state.dirElem} {col.header}
                </div>
            </th>
        );
    }

    render() {
        return (
            <table className="item-table table mapcomponent-table">
                <thead>
                    <tr className="primary">
                        {this.props.columns.map(col => this.renderHeader(col))}
                    </tr>
                </thead>
            </table>
        );
    }
}