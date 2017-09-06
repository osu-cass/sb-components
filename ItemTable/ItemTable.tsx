import * as ItemCardViewModel from '../Models/ItemCardViewModel';
import * as React from "react";
import * as ItemTableHeader from './ItemTableHeader';

interface Props {
    tableRef?: (ref: HTMLTableElement) => void;
    mapRows: ItemCardViewModel.ItemCardViewModel[];
    rowOnClick: (item: ItemCardViewModel.ItemCardViewModel) => void;
    sort: ItemTableHeader.HeaderSort[];
    columns: ItemTableHeader.SortColumn[];
    selectedRow?: ItemCardViewModel.ItemCardViewModel;
}

export class DataTable extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

   

    renderCell(col: ItemTableHeader.SortColumn, cellData: ItemCardViewModel.ItemCardViewModel): JSX.Element {
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