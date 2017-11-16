import * as React from "react";
import { SortColumn, HeaderSort, SortDirection } from './ItemTableModels';


export interface Props {
    columns: SortColumn[];
    onHeaderClick: (header: SortColumn) => void;
    sorts: HeaderSort[];
}

export interface State { }


const invokeResetSortLimit = 2;

const style = {
    color: "gray"
}

const decendingArrow = (
    <span style={style} className="fa fa-sort-desc" aria-hidden="true" />
);

const acendingArrow = (
    <span style={style} className="fa fa-sort-asc" aria-hidden="true" />
);

const noSort = (
    <span style={style} className="fa fa-sort" aria-hidden="true" />
);


export class HeaderTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dirElem: undefined
        }
    }

    headerEventHandler(scol: SortColumn, hcol: HeaderSort | undefined) {
        this.props.onHeaderClick(scol);
    }

    setDirElem(headerSort: HeaderSort | undefined): JSX.Element {
        let dirElem = noSort;
        if (!headerSort) {
            return dirElem;
        } else if (headerSort.direction === SortDirection.Ascending) {
            dirElem = acendingArrow;
        } else if (headerSort.direction === SortDirection.Descending) {
            dirElem = decendingArrow;
        }
        return dirElem;
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
                    <span>{col.header}</span> 
                    {this.setDirElem(headerSort)} 
                </div>
            </th>
        );
    }

    render() {
        return (
            <thead>
                <tr className="primary">
                    <th></th>
                    {this.props.columns.map(col => this.renderHeader(col))}
                </tr>
            </thead>
        );
    }
}