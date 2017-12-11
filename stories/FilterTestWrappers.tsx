import { BasicFilterContainerProps } from "../src/Filter/BasicFilterContainer";
import * as React from "react";
import {
  AdvancedFilterContainer,
  AdvancedFilterCategoryModel,
  BasicFilterContainer,
  BasicFilterCategoryModel,
  FilterOptionModel
} from "../src";
import {
  mockAdvancedFilterCategoriesAll,
  mockBasicFilterCategories
} from "./Filter/mocks";

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

export interface BasFilContainerTestProps extends BasicFilterContainerProps {}

interface BasFilContainerTestState {
  filterCategories: BasicFilterCategoryModel[];
}

// This test wrapper serves just to allow the functionality of the Basic filter so
// that we can confirm that it works as expected. It passes the filterCategories into
// the AdvancedFilterContainer as props
export class BasFilContainerTestWrapper extends React.Component<
  BasFilContainerTestProps,
  BasFilContainerTestState
> {
  constructor(props: BasFilContainerTestProps) {
    super(props);
    this.state = {
      filterCategories: mockBasicFilterCategories
    };
  }
  updateFilter = (filterCategories: BasicFilterCategoryModel[]) => {
    this.setState({ filterCategories });
  };

  render() {
    const { filterCategories } = this.state;
    const { handleAdvancedFilterExpand, containsAdvancedFilter } = this.props;
    return (
      <BasicFilterContainer
        filterCategories={filterCategories}
        onUpdateFilter={this.updateFilter}
        containsAdvancedFilter={containsAdvancedFilter}
        handleAdvancedFilterExpand={handleAdvancedFilterExpand}
      />
    );
  }
}
