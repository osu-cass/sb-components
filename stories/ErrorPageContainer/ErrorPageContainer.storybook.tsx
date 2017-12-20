import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { ItemTableContainer } from "../../src/index";
import { ErrorPageContainer } from "../../src/ErrorPageContainer/ErrorPageContainer";

storiesOf("Error Page Container", module).add("empty props render", () => (
  <ErrorPageContainer />
));
