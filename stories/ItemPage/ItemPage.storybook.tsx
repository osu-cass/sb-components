import * as React from "react";
import { ItemViewerContainer } from "@src/index";
import { storiesOf } from "@storybook/react";
import { routerDecorator } from "../RouterDecorator";
import {
  itemPageMockProps,
  itemPageMockPropsNoItem
} from "@mocks/ItemPage/mocks";

storiesOf("Item Page", module)
  .addDecorator(routerDecorator)
  .add("Item Page with an item", () => (
    <ItemViewerContainer {...itemPageMockProps} />
  ))
  .add("Item Page returns error", () => (
    <ItemViewerContainer {...itemPageMockPropsNoItem} />
  ));
