import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { NavMenu } from "src/index";
import { RouterDecorator } from "../RouterDecorator";
import { SiteLinks } from "mocks/Layout/mocks";

storiesOf("Layout Nav", module)
  .addDecorator(RouterDecorator)
  .addDecorator(CenterDecorator)
  .add("name no links", () => <NavMenu siteName="Test" />)
  .add("name links", () => <NavMenu siteName="Test" links={SiteLinks} />);
