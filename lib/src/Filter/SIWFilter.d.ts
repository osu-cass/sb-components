import * as React from "react";
import { AdvancedFilterCategoryModel, BasicFilterCategoryModel, FilterType } from "./FilterModels";
import { SearchAPIParamsModel, ItemsSearchModel } from "../ItemSearch/ItemSearchModels";
export interface SIWFilterProps {
    basicFilter: BasicFilterCategoryModel[];
    advancedFilter: AdvancedFilterCategoryModel[];
    searchAPI: SearchAPIParamsModel;
    searchModel?: ItemsSearchModel;
    filterId?: string;
    onFilterUpdated: (searchParams: SearchAPIParamsModel, basic: BasicFilterCategoryModel[], advanced: AdvancedFilterCategoryModel[]) => void;
}
export interface SIWFilterState {
    expanded: boolean;
}
export declare class SIWFilter extends React.Component<SIWFilterProps, SIWFilterState> {
    constructor(props: SIWFilterProps);
    onBasicFilterUpdated: (basicFilter: BasicFilterCategoryModel[], changed: FilterType) => void;
    onResetFilters: () => void;
    toggleExpanded: () => void;
    onAdvancedFilterUpdated: (advancedFilter?: AdvancedFilterCategoryModel[] | undefined, changed?: FilterType | undefined) => void;
    render(): JSX.Element;
}
