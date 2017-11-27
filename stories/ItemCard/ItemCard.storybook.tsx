import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { RouterDecorator } from "../RouterDecorator";
import { completeItemCard } from "./mocks";
import { ItemCardCondensed, ItemCard } from "../../src";

// // storiesOf("Item Card", module)
// //   .addDecorator(RouterDecorator)
// //   .addDecorator(CenterDecorator)
// //   .add("Item Card", () => <ItemCard {...completeItemCard} />)
// //   .add("Item Card Condensed", () => (
// //     <ItemCardCondensed {...completeItemCard} />
// //   ));
