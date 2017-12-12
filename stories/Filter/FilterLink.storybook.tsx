import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  FilterLink,
  ItemTableContainer,
  ItemTableContainerProps
} from "../../src/index";
import { itemTableSortProps } from "../ItemTable/mocks";
import { CenterDecorator } from "../CenterDecorator";
import { ItemCardModel } from "../../src";

const style: React.CSSProperties = {
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  height: "100%",
  paddingTop: "300px",
  alignItems: "center",
  justifyContent: "center"
};

const style1: React.CSSProperties = {
  display: "flex",
  height: "100vh",
  flexDirection: "column"
};

let itemTableLongList: ItemTableContainerProps = {
  ...itemTableSortProps
};

let itemCards: ItemCardModel[] = [];

for (let i = 0; i < 50; i++) {
  itemCards.push({
    bankKey: 187,
    itemKey: i + 5,
    title: "delta",
    grade: 2,
    gradeLabel: "Grade 2",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    claimCode: "ELA4",
    claimLabel: "Delta",
    targetHash: 4,
    targetId: "D",
    targetShortName: "",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false
  });
}

itemTableLongList.itemCards = itemCards;

storiesOf("Filter Link", module)
  .add("changed color on hover and click", () => (
    <div style={style}>
      <FilterLink filterId="javascript:void(0)" />
    </div>
  ))
  .add("remains a fixed footer on scroll", () => (
    <div style={style1}>
      <div style={{ flex: "1 0 auto" }}>
        <ItemTableContainer {...itemTableLongList} />
      </div>
      <FilterLink filterId="javascript:void(0)" />
    </div>
  ));
