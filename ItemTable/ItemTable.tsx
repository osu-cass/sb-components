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
    renderRow(rowData: ItemCardViewModel.ItemCardViewModel, index: number): JSX.Element {
        const collapse = (<i style={{ color: "gray" }} className="fa fa-chevron-right fa-sm" aria-hidden="true"></i>)
        const expand = (<i style={{ color: "white" }} className="fa fa-chevron-down fa-sm" aria-hidden="true"></i>)
        const style={
            display: "block",
            padding: "0px"
        }
        let tab = null;
        let isSelected = false;
        if (this.props.selectedRow) {
            isSelected = rowData.itemKey === this.props.selectedRow.itemKey && rowData.bankKey === this.props.selectedRow.bankKey;
        }
        let row = (
            <tr key={index} className={isSelected ? "selected" : ""}
                onClick={() => {
                    this.handleRowClick(rowData);
                }}>
                <td>{isSelected ? expand : collapse}</td>
                {this.props.columns.map(col => this.renderCell(col, rowData))}
            </tr>
        );
        if (this.props.item.kind === "success" && isSelected){
                row = (
                    <tr key={index}>
                        <td colSpan={6}>
                            <table className="item-table mapcomponent-table" style={style}>
                                <tbody>
                                    {row}
                                    <tr>
                                        <td colSpan={6}>
                                            <ItemCardViewer.ItemCardViewer
                                                item={this.props.item.content}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )
        }

        return row;
    }

        render() {
            return (<tbody>{this.props.mapRows.map((rowData, idx) => this.renderRow(rowData, idx))}</tbody>);
        }
    }