import * as React from "react";
import { AboutItemRevisionModel } from "./AboutItemModels";
export interface AboutItemProps extends AboutItemRevisionModel {
    showModal?: boolean;
}
export interface AboutItemState {
    showModal: boolean;
}
export declare class AdvancedAboutItem extends React.Component<AboutItemProps, AboutItemState> {
    constructor(props: AboutItemProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    render(): JSX.Element;
}
