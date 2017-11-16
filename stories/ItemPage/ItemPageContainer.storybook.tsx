import * as React from "react";
import { ItemPageContainer } from "../../src/ItemPage/ItemPageContainer";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { ItemPageContainerMockProps } from "./mocks";

storiesOf("Item Page Container", module).add("just the container", () => (
  <ItemPageContainer {...ItemPageContainerMockProps} />
));
