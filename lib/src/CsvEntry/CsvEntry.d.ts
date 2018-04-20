import * as React from "react";
import { ItemRevisionModel, CsvRowModel } from "@src/index";
export interface CsvEntryProps {
    onItemsUpdate: (items: ItemRevisionModel[]) => void;
    onBlur: () => void;
}
export interface CsvEntryState {
    csvInputValue?: string;
    csvData: CsvRowModel[];
}
export declare class CsvEntry extends React.Component<CsvEntryProps, CsvEntryState> {
    constructor(props: CsvEntryProps);
    renderHelpButton(): JSX.Element;
    handleCsvChange(event: React.FormEvent<HTMLTextAreaElement>): void;
    handleCsvBlur: () => void;
    render(): JSX.Element;
}
