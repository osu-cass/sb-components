import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AboutThisItemDetail } from "@src/index";
import { aboutItemMockModel } from "@mocks/AboutItem/mocks";
import { centerDecorator } from "../CenterDecorator";

storiesOf("About This Item Detail", module)
  .addDecorator(centerDecorator)
  .add("displays information about an item", () => (
    <AboutThisItemDetail {...aboutItemMockModel} />
  ));
