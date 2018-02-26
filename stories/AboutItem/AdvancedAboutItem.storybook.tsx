import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RouterDecorator } from "../RouterDecorator";
import { AdvancedAboutItem } from "src/AboutItem/AdvancedAboutItem";
import { aboutItemRevisionMockModel } from "mocks/AboutItem/mocks";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("About Item Revision Modal", module)
  .addDecorator(CenterDecorator)
  .addDecorator(RouterDecorator)
  .add("default open", () => (
    <AdvancedAboutItem {...aboutItemRevisionMockModel} showModal={true} />
  ))
  .add("closed", () => <AdvancedAboutItem {...aboutItemRevisionMockModel} />);
