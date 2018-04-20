import * as React from "react";
import { ItemCardModel, AboutItemModel, Resource, ItemModel } from "@src/index";
/**
 * SearchResultType enum
 * @enum {number}
 */
export declare enum SearchResultType {
    Table = 0,
    ItemCard = 1,
}
/**
 * SearchResultContainerProps props
 * @interface SearchResultContainerProps
 * @method {(item: { itemKey: number; bankKey: number },reset: boolean) => void} onRowSelection
 * @member {ItemCardModel[]?} itemCards
 * @member {Resource<AboutItemModel>} item
 * @member {SearchResultType} defaultRenderType
 */
export interface SearchResultContainerProps {
    onRowSelection: (item: ItemModel, reset: boolean) => void;
    onItemSelection: (item: ItemCardModel) => void;
    itemCards?: ItemCardModel[];
    item?: Resource<AboutItemModel>;
    defaultRenderType?: SearchResultType;
    isLinkTable: boolean;
}
/**
 * SearchResultContainerState state
 * @interface SearchResultContainerState
 * @member {SearchResultType} renderType
 */
export interface SearchResultContainerState {
    renderType: SearchResultType;
    loading: boolean;
}
/**
 * The SearchResultContainer is a toggleable display/menu that changes search
 * results from a table layout to ItemCard and vice versa.
 * @class SearchResultContainer
 * @extends {React.Component<SearchResultContainerProps, SearchResultContainerState>}
 */
export declare class SearchResultContainer extends React.Component<SearchResultContainerProps, SearchResultContainerState> {
    constructor(props: SearchResultContainerProps);
    componentWillReceiveProps(nextProps: SearchResultContainerProps): void;
    /**
     * Renders all results to ItemCard view.
     */
    renderItemCards(): JSX.Element[] | undefined;
    /**
     * Depending on what renderType is selected, ItemCards or a table
     * will be rendered.
     */
    renderBody(): JSX.Element;
    handleTypeChange: (renderType: SearchResultType) => void;
    /**
     * Renders button toggle for changing the layout to cards or table
     * @param {SearchResultType} viewType
     * @returns {JSX.Element} button toggle
     */
    renderToggle(viewType: SearchResultType): JSX.Element;
    /**
     * Renders toggle buttons for changing the layout to table and item card
     */
    renderHeader(): JSX.Element;
    /**
     * Returns a wrapper of items displayed as a table or card view
     * @returns default render method
     */
    render(): JSX.Element;
}
