import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterType
} from "./FilterModels";
import {
  SearchAPIParamsModel,
  ItemsSearchModel
} from "../ItemSearch/ItemSearchModels";
import { AdvancedFilterContainer } from "./AdvancedFilterContainer";
import { BasicFilterContainer } from "./BasicFilterContainer";
import { Filter } from "../Filter/Filter";
import { ItemSearch } from "../ItemSearch/ItemSearch";

export interface CombinedFilterProps {
  basicFilter: BasicFilterCategoryModel[];
  advancedFilter: AdvancedFilterCategoryModel[];
  searchAPI: SearchAPIParamsModel;
  searchModel?: ItemsSearchModel;
  filterId?: string;
  onFilterUpdated: (
    searchParams: SearchAPIParamsModel,
    basic: BasicFilterCategoryModel[],
    advanced: AdvancedFilterCategoryModel[]
  ) => void;
}

export interface CombinedFilterState {
  expanded: boolean;
}

export class CombinedFilter extends React.Component<
  CombinedFilterProps,
  CombinedFilterState
> {
  constructor(props: CombinedFilterProps) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

  onAdvancedFilterUpdated = (
    advancedFilter?: AdvancedFilterCategoryModel[],
    changed?: FilterType
  ) => {
    if (!advancedFilter) {
      return;
    }

    let { basicFilter, searchAPI, onFilterUpdated, searchModel } = this.props;
    if (changed) {
      const changedBasicFilter = basicFilter.find(f => f.code === changed);
      const changedAdvancedFilter = advancedFilter.find(
        f => f.code === changed
      );

      if (changedAdvancedFilter) {
        //add or remove changed advanced filter item to search params
        searchAPI = ItemSearch.updateSearchApiModel(
          changedAdvancedFilter,
          searchAPI
        );
        if (changedBasicFilter) {
          //update corresponding basic filter category
          Filter.updateSingleFilter(changedBasicFilter, changedAdvancedFilter);
        }
      }
    }

    if (searchModel) {
      //remove any searchAPI params that aren't visible anymore
      searchAPI = ItemSearch.updateDependentSearchParams(
        searchAPI,
        searchModel
      );
      //update advanced filter based on changes to searchAPIparams
      advancedFilter = Filter.getUpdatedSearchFilters(
        searchModel,
        advancedFilter,
        searchAPI
      );
    }

    onFilterUpdated(searchAPI, basicFilter, advancedFilter);
  };

  onBasicFilterUpdated = (
    basicFilter: BasicFilterCategoryModel[],
    changed: FilterType
  ) => {
    let {
      advancedFilter,
      searchAPI,
      onFilterUpdated,
      searchModel
    } = this.props;

    const changedBasicFilter = basicFilter.find(f => f.code === changed);
    const changedAdvancedFilter = advancedFilter.find(f => f.code === changed);

    if (changedBasicFilter) {
      //update search API based on changes to basic filter
      searchAPI = ItemSearch.updateSearchApiModel(
        changedBasicFilter,
        searchAPI
      );
      if (changedAdvancedFilter) {
        //update corresponding advanced filter category
        Filter.updateSingleFilter(changedAdvancedFilter, changedBasicFilter);
      }
    }

    if (searchModel) {
      //remove any searchAPI params that aren't visible anymore
      searchAPI = ItemSearch.updateDependentSearchParams(
        searchAPI,
        searchModel
      );
      //update advanced filter based on changes to searchAPIparams
      advancedFilter = Filter.getUpdatedSearchFilters(
        searchModel,
        advancedFilter,
        searchAPI
      );
    }

    onFilterUpdated(searchAPI, basicFilter, advancedFilter);
  };

  render() {
    const id = this.props.filterId || "";
    let advancedFilter: JSX.Element | undefined;
    if (this.state.expanded) {
      advancedFilter = (
        <AdvancedFilterContainer
          isNested={true}
          filterCategories={this.props.advancedFilter}
          onUpdateFilter={this.onAdvancedFilterUpdated}
        />
      );
    }

    return (
      <div className="filter-component-wrapper">
        <BasicFilterContainer
          filterId={id}
          filterCategories={this.props.basicFilter}
          onUpdateFilter={this.onBasicFilterUpdated}
          containsAdvancedFilter={true}
          handleAdvancedFilterExpand={this.toggleExpanded}
        />
        {advancedFilter}
      </div>
    );
  }
}
