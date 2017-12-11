import * as React from "react";
import {
  AdvancedFilter,
  AdvancedFilterContainer,
  AdvancedFilterCategoryModel,
  FilterOptionModel
} from "../src";
import { mockAdvancedFilterCategoriesAll } from "./Filter/mocks";

export interface AdvFilContainerTestProps {
  isNested?: boolean;
  pageTitle?: string;
}

interface AdvFilContainerTestState {
  filterCategories: AdvancedFilterCategoryModel[];
}

// This test wrapper serves just to allow the  functionality of the Advanced filter so
// that we can confirm that it works as expected. It passes the filterCategories into
// the AdvancedFilterContainer as props
export class AdvFilContainerTestWrapper extends React.Component<
  AdvFilContainerTestProps,
  AdvFilContainerTestState
> {
  constructor(props: AdvFilContainerTestProps) {
    super(props);
    this.state = {
      filterCategories: mockAdvancedFilterCategoriesAll
    };
  }
  updateFilter = (filterCategories: AdvancedFilterCategoryModel[]) => {
    this.setState({ filterCategories });
  };

  render() {
    const { filterCategories } = this.state;

    return (
      <AdvancedFilterContainer
        {...this.props}
        onUpdateFilter={this.updateFilter}
        filterCategories={filterCategories}
      />
    );
  }
}
