import * as React from "react";
import { storiesOf } from "@storybook/react";
import { routerDecorator } from "../RouterDecorator";
import { AdvancedAboutItem } from "@src/index";
import { aboutItemRevisionMockModel } from "@mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";

storiesOf("About Item Revision Modal", module)
  .addDecorator(centerDecorator)
  .addDecorator(routerDecorator)
  .add("default open", () => (
    <AdvancedAboutItem {...aboutItemRevisionMockModel} showModal={true} />
  ))
  .add("closed", () => <AdvancedAboutItem {...aboutItemRevisionMockModel} />);
