import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { mockBasicFilterCategories } from "@mocks/Filter/mocks";
import { BasFilContainerTestWrapper } from "../FilterTestWrappers";
import { BasicFilterContainer, BasicFilterContainerProps } from "@src/index";

const props: BasicFilterContainerProps = {
  filterCategories: mockBasicFilterCategories,
  onUpdateFilter: action("clicked"),
  containsAdvancedFilter: false,
  handleAdvancedFilterExpand: () => {
    return;
  }
};

storiesOf("Basic Filter Container", module)
  .add("Basic Filter only", () => <BasFilContainerTestWrapper {...props} />)
  .add("Basic Filter with Advanced filter expansion button", () => (
    <BasFilContainerTestWrapper {...props} containsAdvancedFilter={true} />
  ));
