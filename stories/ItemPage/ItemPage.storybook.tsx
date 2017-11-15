import * as React from "react";
import { ItemPage } from "../../src/ItemPage/ItemPage";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { ItemPageMockProps, ItemPageMockPropsNoItem } from "./mocks";

storiesOf( "Item Page", module )
    .add("Item Page with an item", () => <ItemPage {...ItemPageMockProps} /> )
    .add("Item Page returns error", () => <ItemPage {...ItemPageMockPropsNoItem}/>)
