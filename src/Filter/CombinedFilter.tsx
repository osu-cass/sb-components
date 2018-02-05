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
import * as CombinedFilterHelpers from "./CombinedFilterHelpers";

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
    const updated = CombinedFilterHelpers.advancedFilterUpdated(
      this.props.basicFilter,
      this.props.searchAPI,
      advancedFilter,
      this.props.searchModel,
      changed
    );
    if (updated.advancedFilter) {
      this.props.onFilterUpdated(
        updated.searchAPI,
        updated.basicFilter,
        updated.advancedFilter
      );
    }
  };

  onBasicFilterUpdated = (
    basicFilter: BasicFilterCategoryModel[],
    changed: FilterType
  ) => {
    const updated = CombinedFilterHelpers.basicFilterUpdated(
      basicFilter,
      this.props.searchAPI,
      this.props.advancedFilter,
      this.props.searchModel,
      changed
    );

    this.props.onFilterUpdated(
      updated.searchAPI,
      updated.basicFilter,
      updated.advancedFilter || []
    );
  };

  onResetFilters = () => {
    const updated = CombinedFilterHelpers.resetFilters(
      this.props.basicFilter,
      this.props.advancedFilter,
      this.props.searchModel
    );

    this.props.onFilterUpdated(
      updated.searchAPI,
      updated.basicFilter,
      updated.advancedFilter || []
    );
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
          resetHandler={this.onResetFilters}
        />
        {advancedFilter}
      </div>
    );
  }
}
