import * as React from "react";
import * as $ from "jquery";
import { ItemPage } from "../../src/ItemPage/ItemPage";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { RouterDecorator } from "../RouterDecorator";
import { ItemPageMockProps, ItemPageMockPropsNoItem } from "./mocks";

// storiesOf("Item Page", module)
//   .addDecorator(RouterDecorator)
//   .add("Item Page with an item", () => <ItemPage {...ItemPageMockProps} />)
//   .add("Item Page returns error", () => (
//     <ItemPage {...ItemPageMockPropsNoItem} />
//   ));
