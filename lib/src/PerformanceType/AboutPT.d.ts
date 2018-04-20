import * as React from "react";
export interface AboutPTModalProps {
    subject: string;
    description: string;
    showModal?: boolean;
}
export interface AboutPTModalState {
    showModal: boolean;
}
export declare class AboutPTModal extends React.Component<AboutPTModalProps, AboutPTModalState> {
    constructor(props: AboutPTModalProps);
    renderAboutPt(): JSX.Element;
    renderDescription(ptHeader: string): JSX.Element;
    handleShowModal: () => void;
    handleHideModal: () => void;
    render(): JSX.Element;
}
