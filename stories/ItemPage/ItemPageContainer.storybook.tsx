import 'jsdom-global/register'
import * as React from "react";
import { ItemPageContainer } from "../../src/ItemPage/ItemPageContainer";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { RouterDecorator } from "../RouterDecorator";
import { ItemPageContainerMockProps } from "./mocks";

storiesOf("Item Page Container", module)
  .addDecorator(RouterDecorator)
  .add("just the container", () => (
  <ItemPageContainer {...ItemPageContainerMockProps} />
  ));
