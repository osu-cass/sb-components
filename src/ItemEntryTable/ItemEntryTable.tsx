import * as React from "react";
import {
  ItemRevisionModel,
  itemRevisionKey,
  SectionModel,
  SelectOptionProps,
  SelectOption,
  Select,
  ItemEntryRow
} from "@src/index";

export interface ItemEntryTableProps {
  itemRows: ItemRevisionModel[];
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
      <table className="item-table-header">
        <thead>
          <tr>
            <th className="item-table-bank" scope="col">
              Bank
            </th>
            <th className="item-table-item" scope="col">
              Item
            </th>
            <th className="item-table-section" scope="col">
              Section
            </th>
          </tr>
        </thead>
      </table>
    );
  }

  renderBody() {
    const rows = this.props.itemRows.map((row, idx) => (
      <ItemEntryRow
        row={row}
        onRowUpdate={editRow => this.handleRowUpdate(editRow, idx)}
        sections={this.props.sections}
        key={idx}
      />
    ));

    return (
      <table className="item-table-body">
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="section section-dark current-items-table">
        {/* <table> */}
        {this.renderHeader()}
        {this.renderBody()}
        {/* </table> */}
      </div>
    );
  }
}
