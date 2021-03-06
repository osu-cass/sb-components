import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FilterContainerTestWrapper } from "../FilterTestWrappers";

storiesOf("Filter Container", module).add(
  "Contains both Basic and Advanced Filter",
  () => <FilterContainerTestWrapper />
);
