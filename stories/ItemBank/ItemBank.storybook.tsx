import { ItemBankPropsMockModel } from "../../mocks/ItemBank/mocks";
import { Layout } from "../../src/index";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemBank } from "src/ItemBank/ItemBank";
import { AboutItem } from "src/AboutItem/AboutItem";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";
import { ItemAccessibilityModal } from "src/";
import { routerDecorator } from "../RouterDecorator";
import {
  accessibilityModalProp,
  mockAccResourceGroups
} from "mocks/Accessibility/mocks";

storiesOf("Item Bank", module)
  .addDecorator(routerDecorator)
  .add("default", () => (
    <Layout
      children={<ItemBank {...ItemBankPropsMockModel} />}
      siteName="Item Bank"
    />
  ));
