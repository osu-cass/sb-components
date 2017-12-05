import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  AdvancedFilterContainer,
  AdvancedFilterContainerProps,
  FilterOptionModel,
  OptionTypeModel,
  AdvancedFilterCategoryModel
} from "../../src";
import {
  mockAdvancedFilterCategoriesAll,
  mockBasicFilterCategories
} from "./mocks";

interface AdvFilterTestProps {
  properties?: any;
}

interface AdvFilterTestState {
  filterCategories: AdvancedFilterCategoryModel[];
}

// This test wrapper serves just to allow the  functionality of the Advanced filter so
// that we can confirm that it works as expected. It passes the filterCategories into
// the AdvancedFilterContainer as props
class AdvFilterTestWrapper extends React.Component<
  AdvFilterTestProps,
  AdvFilterTestState
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

const props: any = {
  pageTitle: "Search"
};

storiesOf("Advanced Filter Container", module)
  .add("normal render", () => <AdvFilterTestWrapper />)
  .add("page title", () => <AdvFilterTestWrapper properties={props} />);
