import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import {
  itemTableProps,
  itemTableSortProps,
  itemTableSelectProps
} from "./Mocks";
import { ItemTableContainer } from "../../src/ItemTable/ItemTableContainer";

storiesOf("Item Table Container", module)
  .addDecorator(CenterDecorator)
  .add("normal render", () => <ItemTableContainer {...itemTableProps} />)
  .add("verify sort order", () => (
    <ItemTableContainer {...itemTableSortProps} />
  ))
  .add("selected item", () => <ItemTableContainer {...itemTableSelectProps} />);
