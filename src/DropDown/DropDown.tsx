import * as React from "react";
import { ToolTip } from "@src/ToolTip/ToolTip";
import { DropDownSelectionModel } from "./DropDownModels";

export interface DropdownProps {
  label: string;
  disabled: boolean;
  selectionCode: string;
  selections: DropDownSelectionModel[];
  updateSelection(selectionCode: string, resourceCode: string): void;
  defaultSelection: string;
  resourceCode: string;
  infoTag?: string;
}

export class Dropdown extends React.Component<DropdownProps, {}> {
  constructor(props: DropdownProps) {
    super(props);
  }

  onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.props.updateSelection(
      event.currentTarget.value,
      this.props.resourceCode
    );
  };

  renderOption = (selection: DropDownSelectionModel) => {
    const disabledCSS: string = selection.disabled
      ? "option-disabled"
      : "option-enabled";
    const label = this.props.disabled ? "" : selection.label;

    return (
      <option
        value={selection.selectionCode}
        aria-label={selection.label}
        disabled={selection.disabled}
        aria-hidden={selection.disabled}
        key={selection.selectionCode}
        className={disabledCSS}
        aria-selected={false}
      >
        {label}
      </option>
    );
  };

  render() {
    const classes = "accessibility-dropdown form-group ".concat(
      this.props.disabled ? "selection-disabled" : "selection-enabled"
    );
    const options = this.props.disabled
      ? []
      : this.props.selections.map(this.renderOption);
    const disableClass = this.props.disabled ? "disabled" : "";
    const ariaLabel = this.props.disabled
      ? `${this.props.label} unavailable`
      : "";
    const helpText = <p> {this.props.infoTag} </p>;

    return (
      <div className={classes}>
        {this.props.infoTag ? (
          <ToolTip helpText={helpText} displayIcon={true} position="top">
            <label htmlFor={this.props.resourceCode}>
              {" "}
              {this.props.label}{" "}
            </label>
          </ToolTip>
        ) : (
          <label htmlFor={this.props.resourceCode}> {this.props.label} </label>
        )}
        <br />
        <select
          className={`form-control ${disableClass}`}
          id={this.props.resourceCode}
          aria-label={ariaLabel}
          onChange={this.onChange}
          value={this.props.selectionCode}
        >
          {options}
        </select>
      </div>
    );
  }
}
