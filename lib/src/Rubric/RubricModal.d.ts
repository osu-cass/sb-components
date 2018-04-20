import * as React from "react";
import { RubricTableProps } from "@src/index";
export interface RubricModalProps extends RubricTableProps {
    showModal?: boolean;
}
export interface RubricModalState {
    showModal: boolean;
}
export declare class RubricModal extends React.Component<RubricModalProps, RubricModalState> {
    constructor(props: RubricModalProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    render(): JSX.Element;
}
