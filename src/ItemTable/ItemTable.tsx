import * as React from "react";
import { HeaderSortModel, SortColumnModel } from "./ItemTableModels";
import { Resource } from "../ApiModel";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { ItemCardViewer } from "../ItemCard/ItemCardViewer";

export interface ItemTableProps {
  mapRows: ItemCardModel[];
  rowOnClick: (item: ItemCardModel) => void;
  sort: HeaderSortModel[];
  columns: SortColumnModel[];
  selectedRow?: ItemCardModel | null;
  item: Resource<AboutItemModel>;
}

export class ItemTable extends React.Component<ItemTableProps, {}> {
  constructor(props: ItemTableProps) {
    super(props);
  }

  handleRowClick = (rowData: ItemCardModel) => {
    this.props.rowOnClick(rowData);
  };

  renderCell(col: SortColumnModel, cellData: ItemCardModel): JSX.Element {
    return (
      <td key={col.header} className={col.className}>
        <div className={col.className}>{col.accessor(cellData)}</div>
      </td>
    );
  }

  //TODO replace X with a > that specifies that  the table  row can  be expanded
  renderRow(rowData: ItemCardModel, index: number): JSX.Element {
    const collapse = (
      <i
        style={{ color: "gray" }}
        className="fa fa-chevron-right fa-sm"
        aria-hidden="true"
      />
    );
    const expand = (
      <i
        style={{ color: "white" }}
        className="fa fa-chevron-down fa-sm"
        aria-hidden="true"
      />
    );
    const style = {
      display: "block",
      padding: "0px"
    };
    let tab = null;
    let isSelected = false;
    if (this.props.selectedRow) {
      isSelected =
        rowData.itemKey === this.props.selectedRow.itemKey &&
        rowData.bankKey === this.props.selectedRow.bankKey;
    }
    let row = (
      <tr
        key={index}
        className={isSelected ? "selected" : ""}
        onClick={() => {
          this.handleRowClick(rowData);
        }}
      >
        <td>{isSelected ? expand : collapse}</td>
        {this.props.columns.map(col => this.renderCell(col, rowData))}
      </tr>
    );
    if (this.props.item.kind === "success" && isSelected) {
      row = (
        <tr key={index}>
          <td colSpan={6}>
            <table className="item-table mapcomponent-table" style={style}>
              <tbody>
                {row}
                <tr>
                  <td colSpan={6}>
                    <ItemCardViewer item={this.props.item.content} />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      );
    }

    return row;
  }

  render() {
    return (
      <tbody>
        {this.props.mapRows.map((rowData, idx) => this.renderRow(rowData, idx))}
      </tbody>
    );
  }
}
