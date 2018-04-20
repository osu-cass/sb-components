import * as React from "react";
import * as ItemCardModels from "./ItemCardModels";
export interface ItemCardCondensedState {
    redirect: boolean;
}
export declare class ItemCardCondensed extends React.Component<ItemCardModels.ItemCardModel, ItemCardCondensedState> {
    constructor(props: ItemCardModels.ItemCardModel);
    shouldComponentUpdate(nextProps: Readonly<ItemCardModels.ItemCardModel>, nextState: Readonly<ItemCardCondensedState>): boolean;
    handleKeyPress: (e: React.KeyboardEvent<HTMLElement>) => void;
    handleOnClick: () => void;
    render(): JSX.Element;
}
