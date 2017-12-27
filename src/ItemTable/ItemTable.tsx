import * as React from "react";
import { HeaderSortModel, SortColumnModel } from "./ItemTableModels";
import { Resource } from "../ApiModel";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { ItemCardViewer } from "../ItemCard/ItemCardViewer";

export interface ItemTableProps {
  mapRows: ItemCardModel[];
  onRowExpand: (item: ItemCardModel) => void;

  onRowSelect: (item: ItemCardModel) => void;
  sort: HeaderSortModel[];
  columns: SortColumnModel[];
  expandedRow?: ItemCardModel;
  item: Resource<AboutItemModel>;
}

export class ItemTable extends React.Component<ItemTableProps, {}> {
  constructor(props: ItemTableProps) {
    super(props);
  }

  collapse = (
    <i className="fa fa-chevron-right fa-sm table-icon" aria-hidden="true" />
  );
  expand = (
    <i className="fa fa-chevron-down fa-sm table-icon" aria-hidden="true" />
  );

  handleRowClick = (rowData: ItemCardModel) => {
    this.props.onRowExpand(rowData);
  };

  handleCheckboxClick = (event: Event, rowData: ItemCardModel) => {
    event.stopPropagation();
    this.props.onRowSelect(rowData);
    // TODO: add this row to a list of selected rows
  };

  renderCell(col: SortColumnModel, cellData: ItemCardModel): JSX.Element {
    return (
      <td key={col.header} className={col.className}>
        <div className={col.className}>{col.accessor(cellData)}</div>
      </td>
    );
  }

  renderRow(rowData: ItemCardModel, index: number): JSX.Element {
    const unChecked = (
      <i className="fa fa-square-o fa-sm table-icon" aria-hidden="true" />
    );
    const checked = (
      <i className="fa fa-check-square-o fa-sm table-icon" aria-hidden="true" />
    );
    let isSelected = false;
    if (this.props.expandedRow) {
      isSelected =
        rowData.itemKey === this.props.expandedRow.itemKey &&
        rowData.bankKey === this.props.expandedRow.bankKey;
    }
    let row = (
      <tr
        key={index}
        className={isSelected ? "selected" : ""}
        onClick={() => {
          this.handleRowClick(rowData);
        }}
      >
        <td
          onClick={e => {
            e.stopPropagation();
            console.log("add this row to collection as selected");
          }}
        >
          {unChecked}&nbsp;
          {isSelected ? this.expand : this.collapse}
        </td>
        {this.props.columns.map(col => this.renderCell(col, rowData))}
      </tr>
    );
    if (this.props.item.kind === "success" && isSelected) {
      row = (
        <tr key={index}>
          <td colSpan={6}>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  {row}
                  <tr>
                    <td colSpan={6}>
                      <ItemCardViewer item={this.props.item.content} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
