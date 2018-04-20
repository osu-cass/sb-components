import * as React from "react";
/**
 * Option tag props
 * @interface SelectOptionProps
 */
export interface SelectOptionProps {
    selected: boolean;
    label: string;
    value: string;
    disabled?: boolean;
}
/**
 * Creates A11y friendly Option tag used in select tags
 * @param {SelectionOptionProps} props selection option props
 * @returns JSX React Component
 */
export declare const SelectOption: React.SFC<SelectOptionProps>;
