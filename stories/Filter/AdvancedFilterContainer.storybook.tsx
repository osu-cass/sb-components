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
import { mockAdvancedFilterCategoriesAll } from "./mocks";

const props: AdvancedFilterContainerProps = {
  filterOptions: mockAdvancedFilterCategoriesAll,
  onClick: action("clicked")
};

storiesOf("Advanced Filter Container", module).add("normal render", () => (
  <AdvancedFilterContainer {...props} />
));
