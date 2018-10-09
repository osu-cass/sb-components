import * as React from "react";
import {
  ItemRevisionModel,
  itemRevisionKey,
  NamespaceModel,
  SectionModel,
  SelectOptionProps,
  SelectOption,
  Select,
  ItemEntryRow
} from "@src/index";

export interface ItemEntryTableProps {
  itemRows: ItemRevisionModel[];
  namespaces: NamespaceModel[];
  sections: SectionModel[];
  onItemsUpdate: (items: ItemRevisionModel[]) => void;
  onDeleteItem: (items: number) => void;
  onClearItems: () => void;
}

export class ItemEntryTable extends React.Component<ItemEntryTableProps, {}> {
  constructor(props: ItemEntryTableProps) {
    super(props);
  }

  handleRowUpdate(row: ItemRevisionModel, key: number) {
    const itemRows = this.props.itemRows.slice();
    itemRows[key] = row;
    this.props.onItemsUpdate(itemRows);
  }

  handleDeleteRow(key: number) {
    this.props.onDeleteItem(key);
  }

  handleClearItems() {
    this.props.onClearItems();
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th scope="col">Namespace</th>
          <th scope="col">Bank</th>
          <th scope="col">Item</th>
          <th scope="col">Section</th>
          <th>{this.renderClearButton()}</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    const rows = this.props.itemRows.map((row, idx) => (
      <ItemEntryRow
        row={row}
        onRowUpdate={editRow => this.handleRowUpdate(editRow, idx)}
        onDeleteRow={deleteRow => this.handleDeleteRow(idx)}
        namespaces={this.props.namespaces}
        sections={this.props.sections}
        key={idx}
        id={idx}
        isLast={idx === this.props.itemRows.length - 1}
      />
    ));

    return <tbody>{rows}</tbody>;
  }

  renderClearButton() {
    return (
      <input
        className={"btn btn-primary clear-button bg-light"}
        onClick={this.props.onClearItems}
        type="button"
        value="clear all"
      />
    );
  }

  render() {
    return (
      <div className="section section-dark current-items-table">
        <table>
          {this.renderHeader()}
          {this.renderBody()}
        </table>
      </div>
    );
  }
}
