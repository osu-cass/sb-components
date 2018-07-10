import * as React from "react";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import { IframeModal } from "@src/Modals/IframeModal";

const url = "http://www.smarterbalanced.org/privacy-policy/";

storiesOf("Iframe Modal", module)
  .addDecorator(centerDecorator)
  .add("with no contents", () => <IframeModal url="" title="" />)
  .add("with an item", () => <IframeModal url={url} title="Item" />);
