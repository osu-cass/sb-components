import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ToolTip } from "src/ToolTip/ToolTip";
import { CenterDecorator } from "../CenterDecorator";

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
const header = "Header for my tool tip";
storiesOf("ToolTip", module)
  .addDecorator(CenterDecorator)
  .add("with just text", () => <ToolTip helpText="test">Testing</ToolTip>)
  .add("with just long text", () => (
    <ToolTip helpText={longText}>Testing</ToolTip>
  ))
  .add("with just text and header", () => (
    <ToolTip helpText={longText} toolTipHeader={header}>
      Testing
    </ToolTip>
  ))
  .add("with icon", () => (
    <ToolTip helpText="test" displayIcon={true}>
      Testing
    </ToolTip>
  ))
  .add("info for button", () => (
    <ToolTip helpText="test" displayIcon={true}>
      <button>Button</button>
    </ToolTip>
  ))
  .add("display below text", () => (
    <ToolTip helpText="test" position="bottom">
      Testing
    </ToolTip>
  ));
