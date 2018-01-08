import * as React from "react";
import { HeaderSortModel, SortColumnModel } from "./ItemTableModels";
import { Resource } from "../ApiModel";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { ItemCardViewer } from "../ItemCard/ItemCardViewer";
import * as ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";

export interface ItemTableProps {
  mapRows: ItemCardModel[];
  onRowExpand: (item: ItemCardModel) => void;

  onRowSelect: (item: ItemCardModel) => void;
  sort: HeaderSortModel[];
  columns: SortColumnModel[];
  expandedRow?: ItemCardModel;
  item?: Resource<AboutItemModel>;

  isLinkTable: boolean;
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

  handleKeyUpEnter = (e: React.KeyboardEvent<any>, rowData: ItemCardModel) => {
    if (e.keyCode === 13) {
      this.props.onRowExpand(rowData);
    }
  };

  handleCheckboxClick = (
    event: React.MouseEvent<HTMLTableDataCellElement>,
    rowData: ItemCardModel
  ) => {
    event.stopPropagation();
    this.props.onRowSelect(rowData);
  };

  handleCheckboxKeyUpEnter = (
    e: React.KeyboardEvent<any>,
    rowData: ItemCardModel
  ) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      this.props.onRowSelect(rowData);
    }
  };

  handleToolTipKeyUpEnter = (e: React.KeyboardEvent<any>) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      ReactTooltip.show(findDOMNode(e.currentTarget));
    }
  };

  renderCell(col: SortColumnModel, cellData: ItemCardModel): JSX.Element {
    let tag: JSX.Element;

    // if(true) {
    //   tag = <a className={col.className}>{col.accessor(cellData)}</a>;
    // } else {
    tag = (
      <div className={`${col.className}-${cellData.itemKey}`}>
        <a
          tabIndex={0}
          onClick={e => e.stopPropagation()}
          onKeyUp={e => this.handleToolTipKeyUpEnter(e)}
          data-for={`${col.className}-${cellData.itemKey}-tooltip`}
          data-event="click"
          data-tip="custom tooltip here"
          role="button"
        >
          {col.accessor(cellData)}
        </a>
        <ReactTooltip
          id={`${col.className}-${cellData.itemKey}-tooltip`}
          globalEventOff="focusout"
        />
      </div>
    );

    return (
      <td key={col.header} className={col.className}>
        {tag}
      </td>
    );
  }

  renderRow(rowData: ItemCardModel, index: number): JSX.Element[] {
    const { expandedRow, columns, item, isLinkTable } = this.props;
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

    const controls: JSX.Element[] = [];
    if (!isLinkTable) {
      controls.push(
        <td
          key={rowData.bankKey}
          onClick={e => this.handleCheckboxClick(e, rowData)}
          onKeyUp={e => this.handleCheckboxKeyUpEnter(e, rowData)}
          tabIndex={0}
        >
          {rowData.selected === true ? checked : unChecked}&nbsp;
        </td>,
        <td key={rowData.itemKey}>
          {isExpanded ? this.expand : this.collapse}
        </td>
      );
    }
    const row: JSX.Element[] = [
      <tr
        key={index}
        className={isExpanded ? "selected" : ""}
        onClick={() => this.handleRowClick(rowData)}
        onKeyUp={e => this.handleKeyUpEnter(e, rowData)}
        tabIndex={0}
      >
        {controls.length > 0 ? controls : undefined}
        {columns.map(col => this.renderCell(col, rowData))}
      </tr>
    ];

    if (item && item.kind === "success" && isExpanded) {
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
    const { mapRows } = this.props;
    let content = <div>No Items.</div>;
    if (mapRows) {
      content = (
        <tbody>
          {this.props.mapRows.map((rowData, idx) =>
            this.renderRow(rowData, idx)
          )}
        </tbody>
      );
    }

    return content;
  }
}
