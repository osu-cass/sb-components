import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import { routerDecorator } from "../RouterDecorator";
import {
  completeItemCardELA,
  completeItemCardMath
} from "@mocks/ItemCard/mocks";
import { ItemCardCondensed, ItemCard } from "@src/index";

storiesOf("Item Card", module)
  .addDecorator(routerDecorator)
  .addDecorator(centerDecorator)
  .add("Item Card ELA", () => <ItemCard {...completeItemCardELA} />)
  .add("Item Card Math", () => <ItemCard {...completeItemCardMath} />)
  .add("Item Card ELA Condensed", () => (
    <ItemCardCondensed {...completeItemCardELA} />
  ));
