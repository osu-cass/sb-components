import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SearchResultContainer } from "@src/index";
import { mockSearchResultTableProps } from "@mocks/SearchResultContainer/mocks";
import { centerDecorator } from "../CenterDecorator";

storiesOf("Search Result Container", module)
  .addDecorator(centerDecorator)
  .add("normal render", () => (
    <SearchResultContainer {...mockSearchResultTableProps} />
  ));
