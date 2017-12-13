import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { itemTableProps } from "./mocks";
import {
  headerColumns,
  HeaderSortModel,
  HeaderTable,
  SortColumnModel,
  SortDirection
} from "../../src/index";

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
  .add("AP_ScoreGuide tabs", () => (
    <div>
      <table className="item-table mapcomponent-table">
        <HeaderTable {...props} />
      </table>
    </div>
  ));
