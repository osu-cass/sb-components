import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { itemTableProps } from "./Mocks";
import { HeaderTable } from "../../src/ItemTable/HeaderTable";
import {
  headerColumns,
  HeaderSortModel,
  SortColumnModel,
  SortDirection
} from "../../src/ItemTable/ItemTableModels";

const TableWrapperDecorator = (storyFn: () => JSX.Element) => {
  return <table>{storyFn()}</table>;
};

const tabs = ["item", "claimAndTarget", "subject", "grade", "interactionType"];

const sorts: Array<HeaderSortModel> = [
  {
    col: headerColumns[0],
    direction: SortDirection.Ascending,
    resetSortCount: 1
  }
];

const props = {
  columns: headerColumns,
  onHeaderClick: (header: SortColumnModel) =>
    console.log(JSON.stringify(header)),
  sorts
};

storiesOf("Item Table Header", module)
  .addDecorator(CenterDecorator)
  .addDecorator(TableWrapperDecorator)
  .add("AP_ScoreGuide tabs", () => <HeaderTable {...props} />);
