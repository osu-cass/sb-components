import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import { accessibilityModalProp, mockAccResourceGroups } from "./mocks";
import { CenterDecorator } from "../CenterDecorator";
import { ItemAccessibilityModal } from "../../src";
import { allAccessibilityResourceGroups } from "./accessibilityFull";

storiesOf("Accessibility Modal", module)
  .addDecorator(CenterDecorator)
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
  ));
