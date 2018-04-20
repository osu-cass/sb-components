import * as React from "react";
import { AboutItemModel } from "./AboutItemModels";
export interface AboutItemProps extends AboutItemModel {
    showModal?: boolean;
    showRubrics?: boolean;
}
export interface AboutItemState {
    showModal: boolean;
}
export declare class AboutItem extends React.Component<AboutItemProps, AboutItemState> {
    constructor(props: AboutItemProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    private renderRubrics();
    render(): JSX.Element;
}
