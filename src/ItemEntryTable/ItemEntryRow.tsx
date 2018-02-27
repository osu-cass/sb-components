import * as React from "react";
import {
  ItemRevisionModel,
  SectionModel,
  validItemRevisionModel
} from "../ItemBank/ItemBankModels";
import { SelectOptionProps, Select } from "../index";

export interface ItemEntryRowProps {
  onRowUpdate: (row: ItemRevisionModel) => void;
  row: ItemRevisionModel;
  sections: SectionModel[];
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
    if (this.state.isModified) {
      this.setState({ editRow: nextProps.row });
    }
  }

  handleRowUpdate = () => {
    const { editRow, isModified } = this.state;
    if (isModified && validItemRevisionModel(editRow)) {
      this.props.onRowUpdate(editRow);
      this.setState({ isModified: false });
    }
  };

  handleItemKey = (itemKey: number) => {
    const { editRow } = this.state;
    this.setState({ editRow: { ...editRow, itemKey }, isModified: true });
  };

  handleItemBank = (bankKey: number) => {
    const { editRow } = this.state;
    this.setState({ editRow: { ...editRow, bankKey }, isModified: true });
  };

  handleSection = (section: string) => {
    const { editRow } = this.state;
    this.setState(
      { editRow: { ...editRow, section }, isModified: true },
      this.handleRowUpdate
    );
  };

  renderRowNumberInput(
    row: ItemRevisionModel,
    onChange: (value: number) => void,
    rowValue?: number
  ) {
    return (
      <td>
        <input
          aria-valuenow={rowValue || ""}
          aria-valuemin=""
          aria-valuemax="100000"
          type="number"
          value={rowValue || ""}
          onChange={event => onChange(+event.target.value)}
          onBlur={this.handleRowUpdate}
        />
      </td>
    );
  }

  renderRowSection(row: ItemRevisionModel) {
    const options: SelectOptionProps[] = this.props.sections.map(op => {
      return {
        label: op.value,
        value: op.key,
        selected: op.key === row.section
      };
    });

    options.push({
      label: "Select a Section",
      value: "N/A",
      disabled: false,
      selected: row.section === "N/A"
    });

    return (
      <td>
        <Select
          label="Sections"
          labelClass="hidden"
          selected={row.section || "N/A"}
          options={options}
          onChange={this.handleSection}
        />
      </td>
    );
  }

  render() {
    const { editRow } = this.state;

    return (
      <tr>
        {this.renderRowNumberInput(
          editRow,
          this.handleItemBank,
          editRow.bankKey
        )}
        {this.renderRowNumberInput(
          editRow,
          this.handleItemKey,
          editRow.itemKey
        )}
        {this.renderRowSection(editRow)}
      </tr>
    );
  }
}
