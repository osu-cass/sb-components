import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { IframeModal } from "../../src/Modals/IframeModal";

// url that will return as item
const url = "http://www.smarterbalanced.org/privacy-policy/";

storiesOf("Iframe Modal", module)
  .addDecorator(CenterDecorator)
  .add("with no contents", () => <IframeModal url="" title="" />)
  .add("with an item", () => <IframeModal url={url} title="Item" />);
