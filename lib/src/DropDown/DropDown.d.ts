import * as React from "react";
import { DropDownSelectionModel } from "./DropDownModels";
export interface DropdownProps {
    label: string;
    disabled: boolean;
    selectionCode: string;
    selections: DropDownSelectionModel[];
    updateSelection(selectionCode: string, resourceCode: string): void;
    defaultSelection: string;
    resourceCode: string;
}
export declare class Dropdown extends React.Component<DropdownProps, {}> {
    constructor(props: DropdownProps);
    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
    renderOption: (selection: DropDownSelectionModel) => JSX.Element;
    render(): JSX.Element;
}
