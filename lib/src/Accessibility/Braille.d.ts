import * as React from "react";
export interface BrailleLinkProps {
    currentSelectionCode: string;
    brailleItemCodes?: string[];
    braillePassageCodes?: string[];
    bankKey: number;
    itemKey: number;
}
export interface BrailleLinkState {
    displaySpinner: boolean;
}
export declare class BrailleLink extends React.Component<BrailleLinkProps, BrailleLinkState> {
    constructor(props: BrailleLinkProps);
    buildUrl(bankKey: number, itemKey: number): string;
    enableSpinner(): void;
    disableSpinner(): void;
    checkDownloadCookie(count: number): void;
    watchForDlStart(): void;
    renderLoading(): JSX.Element | undefined;
    render(): JSX.Element | undefined;
}
