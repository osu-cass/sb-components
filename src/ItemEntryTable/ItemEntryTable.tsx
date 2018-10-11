import * as React from "react";
import {
  ItemRevisionModel,
  itemRevisionKey,
  NamespaceModel,
  SectionModel,
  SelectOptionProps,
  SelectOption,
  Select,
  validItemRevisionModel,
  ItemEntryRow
} from "@src/index";

export interface ItemEntryTableState {
  itemRows: ItemRevisionModel[];
}

export interface ItemEntryTableProps {
  itemRows: ItemRevisionModel[];
  namespaces: NamespaceModel[];
  sections: SectionModel[];
  onItemsUpdate: (items: ItemRevisionModel[]) => void;
  onDeleteItem: (items: number) => void;
  onClearItems: () => void;
  onSubmit: (items: ItemRevisionModel[]) => void;
}

export class ItemEntryTable extends React.Component<
  ItemEntryTableProps,
  ItemEntryTableState
> {
  constructor(props: ItemEntryTableProps) {
    super(props);
    this.state = {
      itemRows: props.itemRows
    };
  }

  handleRowUpdate(row: ItemRevisionModel, key: number) {
    this.setState((state: ItemEntryTableState) => {
      const itemRows = state.itemRows;
      itemRows[key] = row;
      if (validItemRevisionModel(row)) {
        row.valid = true;
        itemRows.push({});
      } else {
        row.valid = false;
      }

      return { itemRows };
    });
  }

  handleDeleteRow(key: number) {
    // if the item is state but not in the props just remove it from the state.
    if (key >= this.props.itemRows.length) {
      this.setState({
        itemRows: this.state.itemRows.filter((item, index) => index !== key)
      });
    } else {
      this.setState((state: ItemEntryTableState) => {
        this.props.onDeleteItem(key);

        return {
          itemRows: state.itemRows.filter((item, index) => index !== key)
        };
      });
    }
  }

  handleClearItems() {
    this.props.onClearItems();
    this.setState((state: ItemEntryTableState, props: ItemEntryTableProps) => {
      console.log(props);

      return { itemRows: props.itemRows };
    });
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th scope="col">Namespace</th>
          <th scope="col">Bank</th>
          <th scope="col">Item</th>
          <th scope="col">Section</th>
          <th />
        </tr>
      </thead>
    );
  }

  renderBody() {
    const rows = this.state.itemRows.map((row, idx) => (
      <ItemEntryRow
        row={row}
        onRowUpdate={editRow => this.handleRowUpdate(editRow, idx)}
        onDeleteRow={deleteRow => this.handleDeleteRow(idx)}
        namespaces={this.props.namespaces}
        sections={this.props.sections}
        key={idx}
        id={idx}
        isLast={idx === this.state.itemRows.length - 1}
      />
    ));

    return (
      <tbody>
        {rows}
        {this.renderFooter()}
      </tbody>
    );
  }

  renderFooter() {
    return (
      <tr>
        <td />
        <td>
          <input
            className="btn btn-primary submit-button bg-primary"
            onClick={apply => this.props.onSubmit(this.state.itemRows)}
            type="button"
            value="apply"
          />
        </td>
        <td>
          <input
            className="btn btn-default clear-button bg-light"
            onClick={click => this.handleClearItems()}
            type="button"
            value="clear all"
          />
        </td>
        <td />
      </tr>
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
