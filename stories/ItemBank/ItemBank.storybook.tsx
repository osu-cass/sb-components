import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemBank } from "src/ItemBank/ItemBank";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("Item Bank", module)
  .addDecorator(CenterDecorator)
  .add("default", () => <ItemBank />);
