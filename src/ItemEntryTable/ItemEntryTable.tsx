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

  renderHeader() {
    return (
      <thead>
        <tr>
          <th scope="col">Namespace</th>
          <th scope="col">Bank</th>
          <th scope="col">Item</th>
          <th scope="col">Section</th>
        </tr>
      </thead>
    );
  }

  renderBody() {
    const rows = this.props.itemRows.map((row, idx) => (
      <ItemEntryRow
        row={row}
        onRowUpdate={editRow => this.handleRowUpdate(editRow, idx)}
        namespaces={this.props.namespaces}
        sections={this.props.sections}
        key={idx}
      />
    ));

    return <tbody>{rows}</tbody>;
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
