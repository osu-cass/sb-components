import * as React from "react";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import {
  itemTableProps,
  itemTableSortProps,
  itemTableSelectProps
} from "@mocks/ItemTable/mocks";
import { ItemTableContainer } from "@src/index";

storiesOf("Item Table Container", module)
  .addDecorator(centerDecorator)
  .add("normal render", () => <ItemTableContainer {...itemTableProps} />)
  .add("render without chevron and checkbox", () => (
    <ItemTableContainer {...itemTableProps} isLinkTable={true} />
  ))
  .add("verify sort order", () => (
    <ItemTableContainer {...itemTableSortProps} />
  ))
  .add("selected item", () => <ItemTableContainer {...itemTableSelectProps} />);
