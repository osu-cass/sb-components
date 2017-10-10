import * as ItemCardViewModel from '../Models/ItemCardViewModel';
import * as React from "react";
import * as ItemTableHeader from './ItemTableHeader';
import * as AboutItemVM from '../Models/AboutItemVM';
import * as ApiModels from '../Models/ApiModels';
import * as ItemCardViewer from '../AboutItem/ItemCardViewer';

interface Props {
    tableRef?: (ref: HTMLTableElement) => void;
    mapRows: ItemCardViewModel.ItemCardViewModel[];
    rowOnClick: (item: ItemCardViewModel.ItemCardViewModel) => void;
    sort: ItemTableHeader.HeaderSort[];
    columns: ItemTableHeader.SortColumn[];
    selectedRow?: ItemCardViewModel.ItemCardViewModel | null;
    item: ApiModels.Resource<AboutItemVM.AboutThisItem>;
}

export class DataTable extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    handleRowClick = (rowData: ItemCardViewModel.ItemCardViewModel) => {
        this.props.rowOnClick(rowData)
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

    //TODO replace X with a > that specifies that  the table  row can  be expanded
    renderRow(rowData: ItemCardViewModel.ItemCardViewModel, index: number, isSelected?: boolean): JSX.Element {
        const collapse = (<i style={{color: "gray" }} className="fa fa-chevron-right fa-sm" aria-hidden="true"></i>)
        const expand = (<i style={{color: "white"}} className="fa fa-chevron-down fa-sm" aria-hidden="true"></i>)
        let tab = null;

        return (
            <tr key={index} className={isSelected ? "selected" : ""}
                onClick={() => {
                    this.handleRowClick(rowData);
                }}>
                <td>{isSelected ? expand : collapse}</td>
                {this.props.columns.map(col => this.renderCell(col, rowData))}
            </tr>
        );
    }

    renderRows(): JSX.Element[] {
        let rows: JSX.Element[] = [];
        if (this.props.item.kind === "success" || this.props.item.kind === "reloading") {
            const mapRows = this.props.mapRows;
            let isSelected = false;
            for (let i = 0; i < mapRows.length + 1; i++) {
                if (this.props.selectedRow) {
                    isSelected = mapRows[i].itemKey === this.props.selectedRow.itemKey
                        && mapRows[i].bankKey === this.props.selectedRow.bankKey;
                    rows.push(this.renderRow(mapRows[i], i, isSelected))
                    if (isSelected) {
                        console.log("inserting card row")
                        rows.push(
                            <tr key={i+1}>
                                <td colSpan={6}>
                                    <ItemCardViewer.ItemCardViewer
                                        item={this.props.item.content}
                                    />
                                </td>
                            </tr>
                        )
                    }
                    i++;
                }
                else {
                    rows.push(this.renderRow(mapRows[i], i, isSelected))
                }

            }
        } else {
            console.log("no card row")
            rows = this.props.mapRows.map((rowData, idx) => this.renderRow(rowData, idx, false))
        }
        return rows;

    }

    render() {
        return (<tbody>{this.renderRows()}</tbody>);
    }
}