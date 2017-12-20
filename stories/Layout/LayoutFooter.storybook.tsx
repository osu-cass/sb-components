import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { Footer } from "src/index";
import { RouterDecorator } from "../RouterDecorator";
import { SiteLinks } from "mocks/Layout/mocks";

storiesOf("Layout Footer", module)
  .addDecorator(CenterDecorator)
  .addDecorator(RouterDecorator)
  .add("default footer", () => <Footer />);
