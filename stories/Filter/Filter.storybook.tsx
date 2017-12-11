import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FilterContainer, FilterContainerProps } from "../../src/";
import {
  advancedFilterGrade,
  mockAdvancedFilterCategoriesAll,
  mockBasicFilterCategories
} from "./mocks";

const props: FilterContainerProps = {
  basicFilterCategories: mockBasicFilterCategories,
  onUpdateBasicFilter: action("clicked on a basic filter"),
  advancedFilterCategories: mockAdvancedFilterCategoriesAll,
  onUpdateAdvancedFilter: action("clicked on an advanced filter")
};

storiesOf("Filter Container", module).add(
  "Contains both Basic and Advanced Filter",
  () => <FilterContainer {...props} />
);
