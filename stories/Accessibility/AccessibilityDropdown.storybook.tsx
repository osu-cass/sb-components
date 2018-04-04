import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  dropDefaultProp,
  dropDisabledProp,
  dropDisabledAllSelectionsProp,
  mockAccResourceGroups
} from "@mocks/Accessibility/mocks";
import { centerDecorator } from "../CenterDecorator";
import { Dropdown } from "@src/index";

storiesOf("Accessibility DropDown", module)
  .addDecorator(centerDecorator)
  .add("default with disabled", () => <Dropdown {...dropDefaultProp} />)
  .add("all disabled", () => <Dropdown {...dropDisabledAllSelectionsProp} />)
  .add("dropdown disabled", () => <Dropdown {...dropDisabledProp} />)
  .add("no selections", () => (
    <Dropdown {...dropDefaultProp} selections={[]} />
  ));
