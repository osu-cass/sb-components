import * as React from "react";
import {
  AdvancedFilter,
  AdvancedFilterContainer,
  AdvancedFilterCategoryModel,
  FilterOptionModel
} from "../src";
import { mockAdvancedFilterCategoriesAll } from "./Filter/mocks";

interface AdvFilContainerTestProps {
  properties?: any;
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
  constructor(props: any) {
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
        onUpdateFilter={this.updateFilter}
        filterCategories={filterCategories}
        {...this.props}
      />
    );
  }
}

interface AdvFilTestProps {
  filterCat: AdvancedFilterCategoryModel;
  filterOptions?: FilterOptionModel[];
}

interface AdvFilTestState {
  filterCat: AdvancedFilterCategoryModel;
}

export class AdvFilTestWrapper extends React.Component<
  AdvFilTestProps,
  AdvFilTestState
> {
  constructor(props: AdvFilTestProps) {
    super(props);
    this.state = {
      filterCat: this.props.filterOptions
        ? {
            ...this.props.filterCat,
            filterOptions: this.props.filterOptions
          }
        : {
            ...this.props.filterCat
          }
    };
  }

  // Just a test function that I copied and adapted from the AdvancedFilterContainer
  // the component will behave according to it's select type on storybook
  onFilterSelect(
    category: AdvancedFilterCategoryModel,
    option?: FilterOptionModel
  ) {
    let { filterCat } = this.props;
    const allPressed = option === undefined && category.displayAllButton;
    if (!category.disabled) {
      let options = filterCat.filterOptions.slice();

      if (allPressed) {
        options.forEach(o => (o.isSelected = false));
      }

      if (option) {
        const optionIdx = options.indexOf(option);
        options[optionIdx].isSelected = !option.isSelected;
        if (!category.isMultiSelect) {
          options.forEach(opt => {
            opt.isSelected = opt === option ? opt.isSelected : false;
          });
        }
      }

      filterCat.filterOptions = options;
      this.setState({ filterCat });
    }
  }

  selectedHandler(filterCat: AdvancedFilterCategoryModel) {
    this.setState({ filterCat });
  }

  render() {
    return (
      <AdvancedFilter
        onFilterOptionSelect={opt =>
          this.onFilterSelect(this.props.filterCat, opt)
        }
        {...this.state.filterCat}
      />
    );
  }
}
