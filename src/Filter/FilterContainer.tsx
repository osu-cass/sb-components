import * as React from "react";
import { AdvancedFilterContainer } from "./AdvancedFilterContainer";
import {
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterOptionModel
} from "./AdvancedFilterModel";
import { BasicFilterContainer } from "./BasicFilterContainer";

export interface FilterContainerProps {
  basicFilterOptions: BasicFilterCategoryModel[];
  onBasicFilterClick: (selected: BasicFilterCategoryModel[]) => void;
  advancedFilterOptions: AdvancedFilterCategoryModel[];
  onAdvancedFilterClick: (selected: AdvancedFilterCategoryModel[]) => void;
}

export interface FilterContainerState {
  basicFilters: BasicFilterCategoryModel[];
  advancedFilters: AdvancedFilterCategoryModel[];
  expanded: boolean;
}

export class FilterContainer extends React.Component<
  FilterContainerProps,
  FilterContainerState
> {
  constructor(props: FilterContainerProps) {
    super(props);
    this.state = {
      basicFilters: props.basicFilterOptions,
      advancedFilters: props.advancedFilterOptions,
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      basicFilterOptions,
      onBasicFilterClick,
      advancedFilterOptions,
      onAdvancedFilterClick
    } = this.props;
    let advancedFilter = null;
    if (this.state.expanded) {
      advancedFilter = (
        <AdvancedFilterContainer
          filterOptions={advancedFilterOptions}
          onClick={onAdvancedFilterClick}
        />
      );
    }
    return (
      <div style={{ width: "100%" }}>
        <BasicFilterContainer
          filterOptions={basicFilterOptions}
          onClick={onBasicFilterClick}
          containsAdvancedFilter={true}
          handleAdvancedFilterExpand={this.handleClick}
        />
        {advancedFilter}
      </div>
    );
  }
}
