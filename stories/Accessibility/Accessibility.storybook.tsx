import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import {
  accessibilityModalProp,
  mockAccResourceGroups,
  allAccessibilityResourceGroups,
  accessibilityManyOptionsMock,
  accessibilityManyOptionsInfoMock
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
  ))
  .add("Many options showing with one info tag", () => (
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={accessibilityManyOptionsInfoMock}
    />
  ));
