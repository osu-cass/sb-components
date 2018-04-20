import * as React from "react";
/**
 * @export
 * @interface IframeModalProps
 */
export interface IframeModalProps {
    url: string;
    title: string;
    btnText?: string;
    btnClass?: string;
    btnIcon?: string;
    showModal?: boolean;
}
/**
 * @export
 * @interface IframeModalState
 */
export interface IframeModalState {
    showModal: boolean;
}
/**
 * Renders Iframe content within a modal component.
 * @export
 * @class IframeModal
 * @extends {React.Component<IframeModalProps, IframeModalState>}
 */
export declare class IframeModal extends React.Component<IframeModalProps, IframeModalState> {
    constructor(props: IframeModalProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    renderOpenButton(): JSX.Element;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
    renderModalWrapper(): JSX.Element;
    render(): JSX.Element;
}
