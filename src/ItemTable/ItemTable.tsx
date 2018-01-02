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
/**
 * Renders the table populated from an array of ItemCardModels. Also renders an instance of the ItemCardViewer,
 * inserting a responsive sub-table with an iframe that displays the Item Card.
 * @class ItemTable
 * @extends {React.Component<ItemTableProps, {}>}
 */
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

  handleCheckboxClick = (
    event: React.MouseEvent<HTMLTableDataCellElement>,
    rowData: ItemCardModel
  ) => {
    event.stopPropagation();
    this.props.onRowSelect(rowData);
  };

  renderCell(col: SortColumnModel, cellData: ItemCardModel): JSX.Element {
    return (
      <td key={col.header} className={col.className}>
        <div className={col.className}>{col.accessor(cellData)}</div>
      </td>
    );
  }

  renderRow(rowData: ItemCardModel, index: number): JSX.Element[] {
    const { expandedRow, columns, item } = this.props;
    const unChecked = (
      <i className="fa fa-square-o fa-sm table-icon" aria-hidden="true" />
    );
    const checked = (
      <i className="fa fa-check-square-o fa-sm table-icon" aria-hidden="true" />
    );
    let isExpanded = false;
    if (expandedRow) {
      isExpanded =
        rowData.itemKey === expandedRow.itemKey &&
        rowData.bankKey === expandedRow.bankKey;
    }
    const row: JSX.Element[] = [
      <tr
        key={index}
        className={isExpanded ? "selected" : ""}
        onClick={() => {
          this.handleRowClick(rowData);
        }}
      >
        <td onClick={e => this.handleCheckboxClick(e, rowData)}>
          {rowData.selected === true ? checked : unChecked}&nbsp;
        </td>
        <td>{isExpanded ? this.expand : this.collapse}</td>
        {columns.map(col => this.renderCell(col, rowData))}
      </tr>
    ];

    if (item.kind === "success" && isExpanded) {
      row.push(
        <tr key="item-card-viewer">
          <td colSpan={7}>
            <ItemCardViewer item={item.content} />
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
