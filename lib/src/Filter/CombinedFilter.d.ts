import * as React from "react";
import { AdvancedFilterCategoryModel, BasicFilterCategoryModel, FilterType } from "./FilterModels";
import { SearchAPIParamsModel, ItemsSearchModel } from "../ItemSearch/ItemSearchModels";
export interface CombinedFilterProps {
    basicFilter: BasicFilterCategoryModel[];
    advancedFilter: AdvancedFilterCategoryModel[];
    searchAPI: SearchAPIParamsModel;
    searchModel?: ItemsSearchModel;
    filterId?: string;
    onFilterUpdated: (searchParams: SearchAPIParamsModel, basic: BasicFilterCategoryModel[], advanced: AdvancedFilterCategoryModel[]) => void;
}
export interface CombinedFilterState {
    expanded: boolean;
}
export declare class CombinedFilter extends React.Component<CombinedFilterProps, CombinedFilterState> {
    constructor(props: CombinedFilterProps);
    toggleExpanded: () => void;
    onAdvancedFilterUpdated: (advancedFilter?: AdvancedFilterCategoryModel[] | undefined, changed?: FilterType | undefined) => void;
    onBasicFilterUpdated: (basicFilter: BasicFilterCategoryModel[], changed: FilterType) => void;
    onResetFilters: () => void;
    render(): JSX.Element;
}
