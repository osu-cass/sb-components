import * as React from "react";

/**
 * Props used for button tag
 * @interface BtnGroupOptionProps
 */
export interface BtnGroupOptionProps {
  onClick: () => void;
  selected: boolean;
  label: string;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Returns sbac-ui-kit button group
 * @param {BtnGroupOptionProps} props btn props for button group
 * @returns JSX React Component
 */
// tslint:disable-next-line:variable-name
export const BtnGroupOption: React.SFC<BtnGroupOptionProps> = props => {
  const className = props.selected ? "active" : "";
  const ariaLabel = props.ariaLabel ? props.ariaLabel : props.label;

  return (
    <button
      className={`btn btn-primary ${className}`}
      role="button"
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={ariaLabel}
    >
      {props.label}
    </button>
  );
};
