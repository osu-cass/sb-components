import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { itemTableProps } from "./Mocks";
import { ItemTableContainer } from "../../src/ItemTable/ItemTableContainer";

storiesOf("Item Page Table", module)
    .addDecorator(CenterDecorator)
    .add("Item Page Table", () => 
        <ItemTableContainer {...itemTableProps} />
    );