import * as React from "react";
export interface ShareModalProps {
    iSAAP: string;
    showModal?: boolean;
}
export interface ShareModalState {
    showModal: boolean;
}
export declare class ShareModal extends React.Component<ShareModalProps, ShareModalState> {
    constructor(props: ShareModalProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    copyToClipboard(event: React.MouseEvent<HTMLButtonElement>): void;
    render(): JSX.Element;
}
