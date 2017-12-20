import * as React from "react";

export interface BtnGroupOptionProps {
  onClick: () => void;
  selected: boolean;
  label: string;
  disabled?: boolean;
}

// tslint:disable-next-line:variable-name
export const BtnGroupOption: React.SFC<BtnGroupOptionProps> = props => {
  const className = props.selected ? "active" : "";
  const disabledClass = props.disabled ? "disabled" : "";

  return (
    <label className={`btn btn-primary ${className} ${disabledClass}`}>
      <input
        type="checkbox"
        role="checkbox"
        disabled={props.disabled}
        onClick={props.onClick}
        autoComplete="off"
        aria-checked={props.selected}
        defaultChecked={props.selected}
      />
      {props.label}
    </label>
  );
};
