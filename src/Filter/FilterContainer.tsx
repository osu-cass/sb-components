import * as React from "react";
import {
  AdvancedFilterContainer,
  BasicFilterContainer,
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "@src/index";

export interface FilterContainerProps {
  basicFilterCategories: BasicFilterCategoryModel[];
  onUpdateBasicFilter: (
    selected: BasicFilterCategoryModel[],
    changed: FilterType
  ) => void;
  advancedFilterCategories: AdvancedFilterCategoryModel[];
  onUpdateAdvancedFilter: (
    selected: AdvancedFilterCategoryModel[],
    changed?: FilterType
  ) => void;
  filterId?: string;
}

export interface FilterContainerState {
  expanded: boolean;
}

export class FilterContainer extends React.Component<
  FilterContainerProps,
  FilterContainerState
> {
  constructor(props: FilterContainerProps) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      basicFilterCategories,
      onUpdateBasicFilter,
      advancedFilterCategories,
      onUpdateAdvancedFilter,
      filterId
    } = this.props;
    const id = filterId || "";
    let advancedFilter: JSX.Element | undefined;
    if (this.state.expanded) {
      advancedFilter = (
        <AdvancedFilterContainer
          isNested={true}
          filterCategories={advancedFilterCategories}
          onUpdateFilter={onUpdateAdvancedFilter}
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
