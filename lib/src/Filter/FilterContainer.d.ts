import * as React from "react";
import { AdvancedFilterCategoryModel, BasicFilterCategoryModel, FilterType } from "@src/index";
export interface FilterContainerProps {
    basicFilterCategories: BasicFilterCategoryModel[];
    onUpdateBasicFilter: (selected: BasicFilterCategoryModel[], changed: FilterType) => void;
    advancedFilterCategories: AdvancedFilterCategoryModel[];
    onUpdateAdvancedFilter: (selected: AdvancedFilterCategoryModel[], changed?: FilterType) => void;
    filterId?: string;
}
export interface FilterContainerState {
    expanded: boolean;
}
export declare class FilterContainer extends React.Component<FilterContainerProps, FilterContainerState> {
    constructor(props: FilterContainerProps);
    handleClick(): void;
    render(): JSX.Element;
}
