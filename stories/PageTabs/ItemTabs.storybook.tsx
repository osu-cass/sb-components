import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemTabs, ItemTabsProps, Tabs } from "../../src/PageTabs/ItemTabs";
import { CenterDecorator } from "../CenterDecorator";

const mockFunc = (tab: Tabs) => {};

storiesOf("Item Tab", module)
  .addDecorator(CenterDecorator)
  .add("viewer tab", () => (
    <ItemTabs selectedTab="viewer" changedTab={mockFunc} />
  ))
  .add("rubric tab", () => (
    <ItemTabs selectedTab="rubric" showRubricTab={true} changedTab={mockFunc} />
  ))
  .add("information tab", () => (
    <ItemTabs selectedTab="information" changedTab={mockFunc} />
  ));
