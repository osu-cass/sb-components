import * as React from "react";
import { SelectedFilterIndicator } from "@src/index";
import { mockAdvancedFilterCategoriesSelected } from "@mocks/Filter/mocks";
import { centerDecorator } from "../CenterDecorator";
import { storiesOf } from "@storybook/react";

storiesOf("SelectedFilterIndicator", module)
  .addDecorator(centerDecorator)
  .add("selected filter", () => (
    <SelectedFilterIndicator
      category={mockAdvancedFilterCategoriesSelected[0]}
      option={mockAdvancedFilterCategoriesSelected[0].filterOptions[0]}
      onClick={() => {
        return;
      }}
    />
  ));
