import "jsdom-global/register";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";

import { ItemTable, ItemTableProps } from "../ItemTable";
import { itemCardList } from "../../../mocks/ItemCard/mocks";
import { tabClassNames } from "../../../mocks/ItemTable/mocks";
import { itemHandler } from "./mocks";

import {
  ItemCardModel,
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  headerColumns
} from "src/index";

describe("ItemTable", () => {
  const props: ItemTableProps = {
    cardRows: itemCardList,
    onRowExpand: itemHandler,
    onRowSelect: itemHandler,
    sort: [],
    columns: headerColumns,
    isLinkTable: false
  };

  const wrapper = mount(<ItemTable {...props} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onRowSelection()", () => {
    const items = wrapper.find("td.item");
    items.forEach(item => {
      item.simulate("click");
      expect(props.onRowSelect).toHaveBeenCalled();
      expect(props.onRowExpand).toHaveBeenCalled();
    });
  });
});
