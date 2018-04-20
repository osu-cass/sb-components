import * as React from "react";
import { ItemCardModel } from "./ItemCardModels";
export interface ItemCardState {
    redirect: boolean;
}
export declare class ItemCard extends React.Component<ItemCardModel, ItemCardState> {
    constructor(props: ItemCardModel);
    shouldComponentUpdate(nextProps: ItemCardModel, nextState: ItemCardState): boolean;
    handleKeyPress: (e: React.KeyboardEvent<HTMLElement>) => void;
    handleOnClick: () => void;
    render(): JSX.Element;
}
