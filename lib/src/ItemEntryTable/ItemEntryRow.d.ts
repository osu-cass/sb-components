import * as React from "react";
import { ItemRevisionModel, SectionModel } from "@src/index";
export interface ItemEntryRowProps {
    onRowUpdate: (row: ItemRevisionModel) => void;
    row: ItemRevisionModel;
    sections: SectionModel[];
}
export interface ItemEntryRowState {
    editRow: ItemRevisionModel;
    isModified: boolean;
}
export declare class ItemEntryRow extends React.Component<ItemEntryRowProps, ItemEntryRowState> {
    constructor(props: ItemEntryRowProps);
    componentWillReceiveProps(nextProps: ItemEntryRowProps): void;
    handleRowUpdate: () => void;
    handleItemKey: (itemKey: number) => void;
    handleItemBank: (bankKey: number) => void;
    handleSection: (section: string) => void;
    renderRowNumberInput(row: ItemRevisionModel, onChange: (value: number) => void, rowValue?: number): JSX.Element;
    renderRowSection(row: ItemRevisionModel): JSX.Element;
    render(): JSX.Element;
}
