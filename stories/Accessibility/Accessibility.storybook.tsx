import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import {
  accessibilityModalProp,
  mockAccResourceGroups,
  allAccessibilityResourceGroups,
  accessibilityManyOptionsMock
} from "@mocks/Accessibility/mocks";
import { centerDecorator } from "../CenterDecorator";
import { ItemAccessibilityModal } from "@src/index";

storiesOf("Accessibility Modal", module)
  .addDecorator(centerDecorator)
  .add("few options hiding", () => (
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      accResourceGroups={mockAccResourceGroups}
    />
  ))
  .add("many options showing ", () => (
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={allAccessibilityResourceGroups}
    />
  ))
  .add("no options showing ", () => (
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={[]}
    />
  ))
  .add("Six options showing with out expand button.", () => (
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={accessibilityManyOptionsMock}
    />
  ));
