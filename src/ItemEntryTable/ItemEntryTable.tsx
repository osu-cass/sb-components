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
  ItemEntryRow,
  isEmptyRevision
} from "@src/index";

export interface ItemEntryTableState {
  itemRows: ItemRevisionModel[];
}

export interface ItemEntryTableProps {
  itemRows: ItemRevisionModel[];
  namespaces: NamespaceModel[];
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

  componentWillReceiveProps(
    props: ItemEntryTableProps,
    state: ItemEntryTableState
  ) {
    if (
      this.props.itemRows !== props.itemRows ||
      this.props.itemRows.length !== props.itemRows.length
    ) {
      this.setState({ itemRows: props.itemRows });
    }
  }

  handleRowUpdate(row: ItemRevisionModel, key: number) {
    this.setState((state: ItemEntryTableState) => {
      const itemRows = state.itemRows;
      itemRows[key] = row;
      if (validItemRevisionModel(row)) {
        row.valid = true;
        if (key === this.state.itemRows.length - 1) {
          itemRows.push({});
        }
      } else if (!isEmptyRevision(row)) {
        row.valid = false;
      } else {
        row.valid = true;
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
      return { itemRows: props.itemRows };
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.itemRows);
    this.setState((state: ItemEntryTableState, props: ItemEntryTableProps) => {
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
          <th scope="col" />
        </tr>
      </thead>
    );
  }

  renderBody() {
    let index = 1;
    const rows = this.state.itemRows.map((row, idx) => {
      index = idx;

      return (
        <ItemEntryRow
          row={row}
          onRowUpdate={editRow => this.handleRowUpdate(editRow, idx)}
          onDeleteRow={deleteRow => this.handleDeleteRow(idx)}
          namespaces={this.props.namespaces}
          key={idx}
          id={idx}
          isLast={idx === this.state.itemRows.length - 1}
          tabIndex={idx * 4 + 1}
        />
      );
    });
    index++;

    return (
      <tbody>
        {rows}
        {this.renderFooter(index * 4 + 1)}
      </tbody>
    );
  }

  renderFooter(tabIndex: number) {
    return (
      <tr>
        <td />
        <td>
          <input
            type="submit"
            className="btn btn-primary submit-button bg-primary"
            onClick={click => this.handleSubmit()}
            value="apply"
            tabIndex={tabIndex}
          />
          <input
            type="submit"
            className="btn btn-default clear-button bg-light"
            onClick={click => this.handleClearItems()}
            value="clear all"
            tabIndex={tabIndex + 1}
          />
        </td>
        <td />
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
