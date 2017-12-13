import * as React from "react";
import { AdvancedFilterContainer } from "./AdvancedFilterContainer";
import {
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterOptionModel
} from "./FilterModels";
import { BasicFilterContainer } from "./BasicFilterContainer";

export interface FilterContainerProps {
  basicFilterCategories: BasicFilterCategoryModel[];
  onUpdateBasicFilter: (selected: BasicFilterCategoryModel[]) => void;
  advancedFilterCategories: AdvancedFilterCategoryModel[];
  onUpdateAdvancedFilter: (selected: AdvancedFilterCategoryModel[]) => void;
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
      onUpdateAdvancedFilter
    } = this.props;

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
      <div id={this.props.filterId}>
        <BasicFilterContainer
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
