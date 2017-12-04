import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { itemTableProps } from "./Mocks";
import { ItemTableContainer } from "../../src/ItemTable/ItemTableContainer";

storiesOf("ItemTableContainer", module)
  .addDecorator(CenterDecorator)
  .add("normal render", () => <ItemTableContainer {...itemTableProps} />);
