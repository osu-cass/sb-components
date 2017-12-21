import * as React from "react";
import { SelectedFilterIndicator } from "../../src/Filter/SelectedFilterIndicator";
import { mockAdvancedFilterCategoriesSelected } from "mocks/Filter/mocks";
import { CenterDecorator } from "../CenterDecorator";
import { storiesOf } from "@storybook/react";

storiesOf("SelectedFilterIndicator", module)
  .addDecorator(CenterDecorator)
  .add("selected filter", () => (
    <SelectedFilterIndicator
      category={mockAdvancedFilterCategoriesSelected[0]}
      option={mockAdvancedFilterCategoriesSelected[0].filterOptions[0]}
      onClick={() => {}}
    />
  ));
