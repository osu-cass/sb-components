import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  FilterLink,
  ItemTableContainer,
  ItemTableContainerProps,
  ItemCardModel
} from "@src/index";
import { itemTableSortProps } from "@mocks/ItemTable/mocks";
import { completeItemCard } from "@mocks/index";

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

const lotsOfCards = () => {
  const cards: ItemCardModel[] = [];
  for (let i = 0; i < 50; i += 1) {
    cards.push({
      ...completeItemCard,
      itemKey: i + 5
    });
  }

  return cards;
};

const itemTableLongList: ItemTableContainerProps = {
  ...itemTableSortProps,
  itemCards: lotsOfCards()
};

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
