import * as React from "react";
export interface AboutPtPopupModalProps {
    subject: string;
    description: string;
    isPerformance: boolean;
    showModal?: boolean;
    skipCookie?: boolean;
}
export interface AboutPTPopupModalState {
    showModal: boolean;
}
export declare class AboutPTPopupModal extends React.Component<AboutPtPopupModalProps, AboutPTPopupModalState> {
    constructor(props: AboutPtPopupModalProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    render(): JSX.Element;
}
