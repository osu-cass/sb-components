import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { checkA11y } from "@storybook/addon-a11y";
import {
  itemTableProps,
  itemTableSortProps,
  itemTableSelectProps
} from "mocks/ItemTable/mocks";
import { ItemTableContainer } from "src/index";

storiesOf("Item Table Container", module)
  .addDecorator(CenterDecorator)
  .addDecorator(checkA11y)
  .add("normal render", () => <ItemTableContainer {...itemTableProps} />)
  .add("verify sort order", () => (
    <ItemTableContainer {...itemTableSortProps} />
  ))
  .add("selected item", () => <ItemTableContainer {...itemTableSelectProps} />);
