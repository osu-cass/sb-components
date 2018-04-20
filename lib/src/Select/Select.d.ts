import * as React from "react";
import { SelectOptionProps } from "./SelectOption";
/**
 * Select tag properties
 * @interface SelectProps
 */
export interface SelectProps {
    onChange: (val: string) => void;
    label: string;
    selected: string;
    disabled?: boolean;
    options: SelectOptionProps[];
    className?: string;
    labelClass?: string;
    wrapperClass?: string;
}
/**
 * Creates A11y friendly Select tag element
 * @param {SelectProps} props select props
 * @returns JSX React Component
 */
export declare const Select: React.SFC<SelectProps>;
