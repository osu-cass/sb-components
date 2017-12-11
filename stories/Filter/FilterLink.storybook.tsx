import * as React from "react";
import { storiesOf } from "@storybook/react";
import { FilterLink } from "../../src/index";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("Filter Link", module)
  .addDecorator(CenterDecorator)
  .add("changed color on hover and click", () => (
    <FilterLink filterId="javascript:void(0)" />
  ));
