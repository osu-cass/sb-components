import { BasicFilterContainerProps } from "../src/Filter/BasicFilterContainer";
import * as React from "react";
import {
  FilterContainer,
  FilterContainerProps,
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

// This test wrapper serves just to allow the  functionality of the AdvancedFilter so
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
    return (
      <AdvancedFilterContainer
        {...this.props}
        {...this.state}
        onUpdateFilter={this.updateFilter}
      />
    );
  }
}

export interface BasFilContainerTestProps extends BasicFilterContainerProps {}

interface BasFilContainerTestState {
  filterCategories: BasicFilterCategoryModel[];
}

// This test wrapper serves just to allow the functionality of the BasicFilter so
// that we can confirm that it works as expected. It passes the filterCategories into
// the BasicFilterContainer as props
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
    return (
      <BasicFilterContainer
        {...this.props}
        {...this.state}
        onUpdateFilter={this.updateFilter}
      />
    );
  }
}

interface FilterContainerTestProps {}

interface FilterContainerTestState {
  basicFilterCategories: BasicFilterCategoryModel[];
  advancedFilterCategories: AdvancedFilterCategoryModel[];
}

// This test wrapper serves just to allow the functionality of the FilterContainer so
// that we can confirm that it works as expected. It passes the advanced and basic filterCategories into
// the FilterContainer as props
export class FilterContainerTestWrapper extends React.Component<
  FilterContainerTestProps,
  FilterContainerTestState
> {
  constructor(props: FilterContainerTestProps) {
    super(props);
    this.state = {
      basicFilterCategories: mockBasicFilterCategories,
      advancedFilterCategories: mockAdvancedFilterCategoriesAll
    };
  }
  updateBasicFilter = (basicFilterCategories: BasicFilterCategoryModel[]) => {
    this.setState({ basicFilterCategories });
  };

  updateAdvancedFilter = (
    advancedFilterCategories: AdvancedFilterCategoryModel[]
  ) => {
    this.setState({ advancedFilterCategories });
  };

  render() {
    const { basicFilterCategories, advancedFilterCategories } = this.state;
    return (
      <FilterContainer
        basicFilterCategories={basicFilterCategories}
        onUpdateBasicFilter={this.updateBasicFilter}
        advancedFilterCategories={advancedFilterCategories}
        onUpdateAdvancedFilter={this.updateAdvancedFilter}
      />
    );
  }
}
