import { Layout } from "../../src/index";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemBank } from "src/ItemBank/ItemBank";
import { AboutItem } from "src/AboutItem/AboutItem";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { CenterDecorator } from "../CenterDecorator";
import { ItemAccessibilityModal } from "src/";
import { RouterDecorator } from "../RouterDecorator";
import {
  accessibilityModalProp,
  mockAccResourceGroups
} from "mocks/Accessibility/mocks";

storiesOf("Item Bank", module)
  .addDecorator(RouterDecorator)
  .add("default", () => (
    <Layout children={<ItemBank />} siteName="Item Bank" />
  ));
