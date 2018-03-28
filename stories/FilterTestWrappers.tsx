import * as React from "react";
import {
  FilterContainer,
  FilterContainerProps,
  AdvancedFilterContainer,
  AdvancedFilterCategoryModel,
  BasicFilterContainer,
  BasicFilterCategoryModel,
  FilterOptionModel,
  BasicFilterContainerProps,
  SIWFilter
} from "@src/index";
import {
  mockAdvancedFilterCategoriesAll,
  mockBasicFilterCategories,
  mockSIWFilterCategories
} from "@mocks/Filter/mocks";

export interface AdvFilContainerTestProps {
  isNested?: boolean;
  pageTitle?: string;
}

export interface AdvFilContainerTestState {
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

export interface BasFilContainerTestState {
  filterCategories: BasicFilterCategoryModel[];
}

// This test wrapper serves just to allow the functionality of the BasicFilter so
// that we can confirm that it works as expected. It passes the filterCategories into
// the BasicFilterContainer as props
export class BasFilContainerTestWrapper extends React.Component<
  BasicFilterContainerProps,
  BasFilContainerTestState
> {
  constructor(props: BasicFilterContainerProps) {
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

export interface FilterContainerTestState {
  basicFilterCategories: BasicFilterCategoryModel[];
  advancedFilterCategories: AdvancedFilterCategoryModel[];
}

// This test wrapper serves just to allow the functionality of the FilterContainer so
// that we can confirm that it works as expected. It passes the advanced and basic filterCategories into
// the FilterContainer as props
export class FilterContainerTestWrapper extends React.Component<
  {},
  FilterContainerTestState
> {
  constructor(props: {}) {
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

// This test wrapper serves just to allow the functionality of the FilterContainer so
// that we can confirm that it works as expected. It passes the advanced and basic filterCategories into
// the FilterContainer as props
// TODO: make a custom state for this wrapper.
// tslint:disable-next-line:max-classes-per-file
export class SIWFilterContainerTestWrapper extends React.Component<
  {},
  FilterContainerTestState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      basicFilterCategories: mockSIWFilterCategories,
      advancedFilterCategories: []
    };
  }

  updateBasicFilter = (basicFilterCategories: BasicFilterCategoryModel[]) => {
    this.setState({ basicFilterCategories });
  };

  render() {
    const { basicFilterCategories } = this.state;

    return (
      <SIWFilter
        basicFilterCategories={basicFilterCategories}
        onUpdateBasicFilter={this.updateBasicFilter}
      />
    );
  }
}
