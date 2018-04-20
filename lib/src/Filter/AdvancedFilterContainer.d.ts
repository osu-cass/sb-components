import * as React from "react";
import { AdvancedFilterCategoryModel, FilterOptionModel, FilterType } from "./FilterModels";
/**
 * AdvancedFilterContainer props
 * @interface AdvancedFilterContainerProps
 * @member {AdvancedFilterCategoryModel[]} filterOptions
 * @method {(selected: AdvancedFilterCategoryModel[]) => void} onUpdateFilterOptions
 * @member {boolean} isNested
 * @member {string?} pageTitle
 * @member {string?} filterId
 */
export interface AdvancedFilterContainerProps {
    filterCategories: AdvancedFilterCategoryModel[];
    onUpdateFilter: (selected?: AdvancedFilterCategoryModel[], changed?: FilterType) => void;
    isNested?: boolean;
    pageTitle?: string;
    filterId?: string;
}
/**
 * AdvancedFilterContainer state
 * @interface AdvancedFilterContainerState
 * @member {boolean} expanded
 */
export interface AdvancedFilterContainerState {
    expanded: boolean;
}
/**
 * The AdvancedFilterContainer is a collapsible menu that displays AdvancedFilters
 * that, when clicked, calls `this.props.onClick()`
 * @class AdvancedFilterContainer
 * @extends {React.Component<AdvancedFilterContainerProps, AdvancedFilterContainerState>}
 */
export declare class AdvancedFilterContainer extends React.Component<AdvancedFilterContainerProps, AdvancedFilterContainerState> {
    constructor(props: AdvancedFilterContainerProps);
    handleClick: () => void;
    handleFilterSelect(category: AdvancedFilterCategoryModel, option?: FilterOptionModel): void;
    /**
     * Resets each of the filter options for each category.
     */
    resetFilters(): void;
    /**
     * Returns true if one or more filter options are selected in any filter category.
     * False if otherwise
     */
    hasActiveFilterIndicators(): boolean;
    /**
     * Builds and returns a list of JSX.Elements that shows which filter
     * options are currently selected
     */
    renderSelectedFilterIndicators(): JSX.Element;
    /**
     * Renders the array of filter categories and their respective filter options.
     */
    renderFilterCategories(): JSX.Element;
    /**
     * Renders the reset button
     */
    renderResetButton(): JSX.Element | undefined;
    /**
     * Renders the button that, when clicked, expands or collapses the advanced filter.
     */
    renderExpandButton(): JSX.Element;
    /**
     * Renders the page title.
     */
    renderPageTitle(): JSX.Element | undefined;
    /**
     * Renders the portion of the Advanced filter container that will always be visible
     * and dictates expansion of the filter menu, essentially the 'header' of the component.
     */
    renderCollapsedFilterContainer(): JSX.Element;
    /**
     * Render the expanded filter container
     */
    renderExpanded(): JSX.Element | undefined;
    render(): JSX.Element;
}
