import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemViewerFrame } from "@src/ItemViewer/ItemViewerFrame";

const url = "http://ivs.smarterbalanced.org/items?ids=187-3246";

storiesOf("Item Viewer Frame", module)
  .add("with no contents", () => <ItemViewerFrame url="" />)
  .add("with an item", () => <ItemViewerFrame url={url} />);
