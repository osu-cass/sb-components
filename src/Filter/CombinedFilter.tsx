import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterType
} from "./FilterModels";
import { SearchAPIParamsModel } from "../ItemSearch/ItemSearchModels";
import { AdvancedFilterContainer } from "./AdvancedFilterContainer";
import { BasicFilterContainer } from "./BasicFilterContainer";

export interface CombinedFilterProps {
  basicFilterCategories: BasicFilterCategoryModel[];
  advancedFilterCategories: AdvancedFilterCategoryModel[];
  searchAPI: SearchAPIParamsModel;
  filterId?: string;
  onFilterUpdated: (
    searchParams: SearchAPIParamsModel,
    basic: BasicFilterCategoryModel[],
    advanced: AdvancedFilterCategoryModel[]
  ) => void;
}

export interface CombinedFilterState {
  expanded: boolean;
  basicFilterCategories: BasicFilterCategoryModel[];
  advancedFilterCategories: AdvancedFilterCategoryModel[];
  searchAPI: SearchAPIParamsModel;
}

export class CombinedFilter extends React.Component<
  CombinedFilterProps,
  CombinedFilterState
> {
  constructor(props: CombinedFilterProps) {
    super(props);

    this.state = {
      expanded: false,
      basicFilterCategories: props.basicFilterCategories,
      advancedFilterCategories: props.advancedFilterCategories,
      searchAPI: {}
    };
  }

  render() {
    const id = this.props.filterId || "";
    let advancedFilter: JSX.Element | undefined;
    if (this.state.expanded) {
      advancedFilter = (
        <AdvancedFilterContainer
          isNested={true}
          filterCategories={this.props.advancedFilterCategories}
          onUpdateFilter={this.props.onUpdateAdvancedFilter}
        />
      );
    }

    return (
      <div className="filter-component-wrapper">
        <BasicFilterContainer
          filterId={filterId}
          filterCategories={basicFilterCategories}
          onUpdateFilter={onUpdateBasicFilter}
          containsAdvancedFilter={true}
          handleAdvancedFilterExpand={this.handleClick}
        />
        {advancedFilter}
      </div>
    );
  }
}
