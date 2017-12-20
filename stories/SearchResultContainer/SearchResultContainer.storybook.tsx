import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SearchResultContainer } from "../../src/SearchResultContainer/SearchResultContainer";
import { SearchResultTableProps } from "./mocks";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("Search Result Container", module)
  .addDecorator(CenterDecorator)
  .add("normal render", () => (
    <SearchResultContainer {...SearchResultTableProps} />
  ));
