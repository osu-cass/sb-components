import * as React from "react";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import { Footer } from "@src/index";
import { routerDecorator } from "../RouterDecorator";
import { mockSiteLinks } from "@mocks/Layout/mocks";

storiesOf("Layout Footer", module)
  .addDecorator(centerDecorator)
  .addDecorator(routerDecorator)
  .add("default footer", () => <Footer />);
