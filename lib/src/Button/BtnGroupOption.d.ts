import * as React from "react";
/**
 * Props used for button tag
 * @interface BtnGroupOptionProps
 */
export interface BtnGroupOptionProps {
    onClick: () => void;
    selected: boolean;
    label: string;
    disabled?: boolean;
}
/**
 * Returns sbac-ui-kit button group
 * @param {BtnGroupOptionProps} props btn props for button group
 * @returns JSX React Component
 */
export declare const BtnGroupOption: React.SFC<BtnGroupOptionProps>;
