import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { mockBasicFilterCategories } from "./mocks";
import { BasicFilterContainer, BasicFilterContainerProps } from "../../src";

const props: BasicFilterContainerProps = {
  filterCategories: mockBasicFilterCategories,
  onUpdateFilter: action("clicked"),
  containsAdvancedFilter: false,
  handleAdvancedFilterExpand: () => {}
};

storiesOf("Basic Filter Container", module)
  .add("Basic Filter only", () => <BasicFilterContainer {...props} />)
  .add("Basic Filter with Advanced filter expansion button", () => (
    <BasicFilterContainer {...props} containsAdvancedFilter={true} />
  ));
