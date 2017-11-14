import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AboutThisItemDetail } from "../../src/index";
import { AboutItemMockModel } from "./mocks";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("About This Item Detail", module)
  .addDecorator(CenterDecorator)
  .add("displays information about an item", () => (
    <AboutThisItemDetail {...AboutItemMockModel} />
  ));
