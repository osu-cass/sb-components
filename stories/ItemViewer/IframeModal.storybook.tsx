import * as React from "react";
import { storiesOf } from "@storybook/react";
import { IframeModal } from "../../src/Modals/IframeModal";

// url that will return as item
const url = "http://ivs.smarterbalanced.org/items?ids=187-3246";

storiesOf("Iframe Modal", module)
  .add("with no contents", () => <IframeModal url="" title="" />)
  .add("with an item", () => <IframeModal url={url} title="Item" />);
