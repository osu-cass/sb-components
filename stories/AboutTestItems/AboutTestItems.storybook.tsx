import * as React from "react";
import { storiesOf } from "@storybook/react";
import {  AboutTestItemsContainer  } from "../../src/index";
import { AboutTestItemsMockProps } from "./mocks";
import { CenterDecorator } from "../CenterDecorator";


storiesOf("About Test Item Container", module)
    .addDecorator(CenterDecorator)
    .add("empty container", () => < AboutTestItemsContainer  {...AboutTestItemsMockProps} />)
    .add("container with content", () => < AboutTestItemsContainer  {...AboutTestItemsMockProps} />);