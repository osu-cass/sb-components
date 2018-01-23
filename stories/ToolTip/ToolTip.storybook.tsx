import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ToolTip } from "src/ToolTip/ToolTip";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("ToolTip", module)
  .addDecorator(CenterDecorator)
  .add("with just text", () => <ToolTip helpText="test">Testing</ToolTip>)
  .add("with icon", () => (
    <ToolTip helpText="test" displayIcon={true}>
      Testing
    </ToolTip>
  ))
  .add("info for button", () => (
    <ToolTip helpText="test" displayIcon={true}>
      <button>Button</button>
    </ToolTip>
  ));
