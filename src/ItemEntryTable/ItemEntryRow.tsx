import * as React from "react";
import {
  ItemRevisionModel,
  NamespaceModel,
  SectionModel,
  validItemRevisionModel,
  SelectOptionProps,
  Select
} from "@src/index";
import { findNamespace } from "@src/ItemBank/ItemBankModels";

export interface ItemEntryRowProps {
  onRowUpdate: (row: ItemRevisionModel) => void;
  onDeleteRow: (row: number) => void;
  id: number;
  row: ItemRevisionModel;
  namespaces: NamespaceModel[];
  isLast: boolean;
  tabIndex: number;
}

export interface ItemEntryRowState {
  editRow: ItemRevisionModel;
  isModified: boolean;
}

export class ItemEntryRow extends React.Component<
  ItemEntryRowProps,
  ItemEntryRowState
> {
  constructor(props: ItemEntryRowProps) {
    super(props);

    this.state = {
      editRow: props.row,
      isModified: false
    };
  }

  componentWillReceiveProps(nextProps: ItemEntryRowProps) {
    if (!this.state.isModified) {
      this.setState({ editRow: nextProps.row });
    }
  }

  handleRowUpdate = () => {
    const { editRow, isModified } = this.state;
    if (isModified && validItemRevisionModel(editRow)) {
      this.props.onRowUpdate(editRow);
      this.setState({ isModified: false });
    } else if (!validItemRevisionModel(editRow)) {
      editRow.valid = false;
      this.props.onRowUpdate(editRow);
      this.setState({ isModified: false });
    }
  };

  deleteRow = () => {
    this.props.onDeleteRow(this.props.id);
  };

  handleItemKey = (itemKey: number) => {
    const { editRow } = this.state;
    this.setState(
      { editRow: { ...editRow, itemKey }, isModified: true },
      this.handleRowUpdate
    );
  };

  handleItemBank = (bankKey: number) => {
    const { editRow } = this.state;
    this.setState({ editRow: { ...editRow, bankKey }, isModified: true });
  };

  handleNamespace = (namespace: string) => {
    const { editRow } = this.state;
    const namespaceModel = findNamespace(namespace, this.props.namespaces);
    const hasBankKey = namespaceModel ? namespaceModel.hasBankKey : false;
    const bankKey = namespaceModel ? namespaceModel.bankKey : 0;
    this.setState(
      {
        editRow: { ...editRow, namespace, hasBankKey, bankKey },
        isModified: true
      },
      this.handleRowUpdate
    );
  };

  renderRowBankKeyInput(
    row: ItemRevisionModel,
    onChange: (value: number) => void,
    rowValue?: number
  ) {
    const error: string = row.valid !== undefined && !row.valid ? "error" : "";

    return (
      <td>
        <input
          className={`form-control ${error}`}
          aria-valuenow={rowValue || undefined}
          aria-valuemin={0}
          aria-valuemax={100000}
          type="number"
          value={row.hasBankKey ? rowValue || "" : ""}
          onChange={event => onChange(+event.target.value)}
          onBlur={this.handleRowUpdate}
          disabled={!row.hasBankKey}
          tabIndex={this.props.tabIndex + 1}
        />
      </td>
    );
  }

  renderRowItemKeyInput(
    row: ItemRevisionModel,
    onChange: (value: number) => void,
    rowValue?: number
  ) {
    const error: string = row.valid !== undefined && !row.valid ? "error" : "";

    return (
      <td>
        <input
          className={`form-control ${error}`}
          aria-valuenow={rowValue || undefined}
          aria-valuemin={0}
          aria-valuemax={100000}
          type="number"
          value={rowValue || ""}
          onChange={event => onChange(+event.target.value)}
          onBlur={this.handleRowUpdate}
          tabIndex={this.props.tabIndex + 2}
        />
      </td>
    );
  }

  renderRowNamespace(row: ItemRevisionModel) {
    const options: SelectOptionProps[] = this.props.namespaces.map(op => {
      return {
        label: op.name,
        value: op.name,
        selected: op.name === row.namespace
      };
    });

    options.unshift({
      label: "Select a Namespace",
      value: "N/A",
      disabled: true,
      selected: row.namespace === "N/A"
    });

    const error: string = row.valid !== undefined && !row.valid ? "error" : "";

    return (
      <td>
        <Select
          className={`form-control ${error}`}
          label="Namespaces"
          labelClass="display-none"
          selected={row.namespace || "N/A"}
          options={options}
          onChange={this.handleNamespace}
          wrapperClass="section-dd"
          tabIndex={this.props.tabIndex}
        />
      </td>
    );
  }

  renderDeleteButton() {
    return (
      <td className="delete-row">
        <input
          className="from-control delete-button btn btn-primary bg-light"
          onClick={this.deleteRow}
          disabled={this.props.isLast}
          value="X"
          tabIndex={this.props.tabIndex + 3}
        />
      </td>
    );
  }

  render() {
    const { editRow } = this.state;
    const hidden =
      this.props.row.valid !== undefined &&
      !this.props.row.valid &&
      this.props.row.itemKey &&
      this.props.row.error
        ? ""
        : "hidden";

    return (
      <tr>
        {this.renderRowNamespace(editRow)}
        {this.renderRowBankKeyInput(
          editRow,
          this.handleItemBank,
          editRow.bankKey
        )}
        {this.renderRowItemKeyInput(
          editRow,
          this.handleItemKey,
          editRow.itemKey
        )}
        {this.renderDeleteButton()}
        <td className={`error-text ${hidden}`}>{this.props.row.error}</td>
      </tr>
    );
  }
}
