import * as React from "react";
import { ItemViewerContainer } from "../../src/ItemPage/ItemViewerContainer";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { RouterDecorator } from "../RouterDecorator";
import {
  ItemPageMockProps,
  ItemPageMockPropsNoItem
} from "mocks/ItemPage/mocks";

storiesOf("Item Page", module)
  .addDecorator(RouterDecorator)
  .add("Item Page with an item", () => (
    <ItemViewerContainer {...ItemPageMockProps} />
  ))
  .add("Item Page returns error", () => (
    <ItemViewerContainer {...ItemPageMockPropsNoItem} />
  ));
