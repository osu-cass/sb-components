import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  AdvancedFilterContainer,
  AdvancedFilterContainerProps
} from "../../src/Filter/AdvancedFilterContainer";
import {
  FilterOptionModel,
  OptionTypeModel,
  AdvancedFilterCategoryModel
} from "../../src/Filter/AdvancedFilterModel";
import { mockAdvancedFilterCategories } from "./mocks";

const props: AdvancedFilterContainerProps = {
  filterOptions: mockAdvancedFilterCategories,
  onClick: action("clicked")
};

storiesOf("AdvancedFilterContainer", module).add("normal render", () => (
  <AdvancedFilterContainer {...props} />
));
