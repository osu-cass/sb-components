import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SearchResultContainer } from "../../src/SearchResultContainer/SearchResultContainer";
import { SearchResultTableProps } from "./mocks";

storiesOf("Search Result Container", module).add("normal render", () => (
  <SearchResultContainer {...SearchResultTableProps} />
));
