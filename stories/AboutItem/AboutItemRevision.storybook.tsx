import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AboutThisItemRevision } from "../../src/index";
import { aboutItemRevisionMockModel } from "mocks/AboutItem/mocks";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("About This Item Revision", module)
  .addDecorator(CenterDecorator)
  .add("displays information about an item", () => (
    <AboutThisItemRevision {...aboutItemRevisionMockModel} />
  ));
