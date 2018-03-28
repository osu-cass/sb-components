import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SIWFilterContainerTestWrapper } from "../FilterTestWrappers";

storiesOf("SIW-Filter Container", module).add("Default", () => (
  <SIWFilterContainerTestWrapper />
));
