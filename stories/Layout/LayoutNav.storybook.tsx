import * as React from "react";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import { NavMenu } from "@src/index";
import { routerDecorator } from "../RouterDecorator";
import { mockSiteLinks } from "@mocks/Layout/mocks";

storiesOf("Layout Nav", module)
  .addDecorator(routerDecorator)
  .addDecorator(centerDecorator)
  .add("name no links", () => <NavMenu siteName="Test" mainContentId="" />)
  .add("name links", () => (
    <NavMenu siteName="Test" links={mockSiteLinks} mainContentId="" />
  ));
