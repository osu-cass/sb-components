import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AboutItem } from "../../src/index";
import { AboutItemMockProps } from "./mocks";
import { CenterDecorator } from "../CenterDecorator";


storiesOf("About Item", module)
    .addDecorator(CenterDecorator)
    .add("displays information about an item", () => <AboutItem {...AboutItemMockProps} />);