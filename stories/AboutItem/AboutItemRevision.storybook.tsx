import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AboutThisItemRevision } from "@src/index";
import { aboutItemRevisionMockModel } from "@mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";

storiesOf("About This Item Revision", module)
  .addDecorator(centerDecorator)
  .add("displays information about an item", () => (
    <AboutThisItemRevision {...aboutItemRevisionMockModel} />
  ));
