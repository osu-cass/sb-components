import * as React from "react";
import { BasicFilterCategoryModel, FilterOptionModel, FilterType } from "./FilterModels";
/**
 * Properties interface for the BasicFilterContainer component.
 * @interface BasicFilterContainerProps
 * @member {BasicFilterCategoryModel[]} filterCategories
 * @member {(selected: BasicFilterCategoryModel[]) => void} onUpdateFilter
 * @member {boolean} containsAdvancedFilter
 * @member {() => void} handleAdvancedFilterExpand
 * @member {string?} filterId
 * @member {(() => void)?} resetHandler
 */
export interface BasicFilterContainerProps {
    filterCategories: BasicFilterCategoryModel[];
    onUpdateFilter: (selected: BasicFilterCategoryModel[], changed: FilterType) => void;
    containsAdvancedFilter: boolean;
    handleAdvancedFilterExpand: () => void;
    filterId?: string;
    resetHandler?: () => void;
}
/**
 * State interface for the BasicFilterContainer component.
 * @interface BasicFilterContainerState
 * @member {boolean} expanded
 */
export interface BasicFilterContainerState {
    expanded?: boolean;
}
/**
 * The BasicFilterContainer is a menu of drop down lists and radio buttons
 * that filter Items based on BasicFilterCategoryModels and their corresponding
 * filter options. Can expand the Advanced filter as well if they are coupled together.
 * @class BasicFilterContainer
 * @extends {React.Component<BasicFilterContainerProps, BasicFilterContainerState>}
 */
export declare class BasicFilterContainer extends React.Component<BasicFilterContainerProps, BasicFilterContainerState> {
    constructor(props: BasicFilterContainerProps);
    /**
     * Sets the isSelected property of the filter that the user selected
     * and sets the state of the parent component with the new filter categories.
     * @method onFilterSelect
     * @param {BasicFilterCategoryModel} category
     * @param {FilterOptionModel} [option]
     */
    onFilterSelect(category: BasicFilterCategoryModel, option?: FilterOptionModel): void;
    renderAdvFilter(fil: BasicFilterCategoryModel, iter: number): JSX.Element;
    /**
     * Returns an array Basic Filter component for each of the filter categories
     * @method renderFilters
     */
    renderFilters(): JSX.Element[];
    /**
     * If the BasicFilter and AdvancedFilter Containers are used in conjunction with each other,
     * this method sets expands and collapses the AdvancedFilterContainer
     * @method handleClick
     */
    handleClick(): void;
    render(): JSX.Element;
}
