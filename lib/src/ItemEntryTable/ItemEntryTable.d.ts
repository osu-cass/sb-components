import * as React from "react";
import { ItemRevisionModel, SectionModel } from "@src/index";
export interface ItemEntryTableProps {
    itemRows: ItemRevisionModel[];
    sections: SectionModel[];
    onItemsUpdate: (items: ItemRevisionModel[]) => void;
}
export declare class ItemEntryTable extends React.Component<ItemEntryTableProps, {}> {
    constructor(props: ItemEntryTableProps);
    handleRowUpdate(row: ItemRevisionModel, key: number): void;
    renderHeader(): JSX.Element;
    renderBody(): JSX.Element;
    render(): JSX.Element;
}
