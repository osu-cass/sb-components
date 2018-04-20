import * as React from "react";
import { ItemRevisionModel, SectionModel } from "@src/index";
export interface ItemBankEntryProps {
    updateItems: (items: ItemRevisionModel[]) => void;
    sections: SectionModel[];
    items: ItemRevisionModel[];
}
export interface ItemBankEntryState {
    csvIsOpen: boolean;
    itemsEntryIsOpen: boolean;
}
export declare class ItemBankEntry extends React.Component<ItemBankEntryProps, ItemBankEntryState> {
    constructor(props: ItemBankEntryProps);
    onAccordionToggle: (accordionType: "csv" | "table") => void;
    onCsvBlur: () => void;
    renderCsvEntry(): JSX.Element;
    renderTableEntry(): JSX.Element;
    render(): JSX.Element;
}
