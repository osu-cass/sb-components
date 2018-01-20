import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ToolTip } from "src/ToolTip/ToolTip";

storiesOf("ToolTip", module).add("with just text", () => (
  <ToolTip>This is the content of the tool tip.</ToolTip>
));
