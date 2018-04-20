import * as React from "react";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { MoreLikeThisModel } from "./MoreLikeThisModels";
export interface Column {
    label: string;
    itemCards: ItemCardModel[];
}
export interface MoreLikeThisModalProps extends MoreLikeThisModel {
    showModal?: boolean;
}
export interface MoreLikeThisModalState {
    showModal: boolean;
}
export declare class MoreLikeThisModal extends React.Component<MoreLikeThisModalProps, MoreLikeThisModalState> {
    constructor(props: MoreLikeThisModalProps);
    handleShowModal: () => void;
    handleHideModal: () => void;
    renderColumn(column: Column | null): JSX.Element | undefined;
    render(): JSX.Element;
}
