import "jsdom-global/register";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { ItemTable, ItemTableProps } from "../ItemTable";
import { itemCardList } from "../../../mocks/ItemCard/mocks";
import { tabClassNames } from "../../../mocks/ItemTable/mocks";
import { itemHandler } from "./mocks";
import { AboutItemMockModel } from "../../../mocks/AboutItem/mocks";
import {
  ItemCardModel,
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  headerColumns
} from "src/index";
import { ItemCardViewer } from "../../index";

describe("ItemTable", () => {
  const selectedItem = itemCardList[0];
  const itemResource: Resource<AboutItemModel> = {
    content: { ...AboutItemMockModel, itemCardViewModel: selectedItem },
    kind: "success"
  };

  const props: ItemTableProps = {
    cardRows: itemCardList,
    onRowExpand: itemHandler,
    onRowSelect: itemHandler,
    sort: [],
    columns: headerColumns,
    isLinkTable: false
  };

  const propsExpanded: ItemTableProps = {
    ...props,
    item: itemResource,
    expandedRow: selectedItem
  };

  const wrapper = mount(
    <table>
      <ItemTable {...props} />
    </table>
  );
  const wrapperExpanded = mount(
    <table>
      <ItemTable {...propsExpanded} />
    </table>
  );

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

  it("expands matches snapshot", () => {
    expect(wrapperExpanded).toMatchSnapshot();
    const itemCardViewer = wrapperExpanded.findWhere(
      node => node.type() === ItemCardViewer
    );
    expect(itemCardViewer).toBeDefined();
  });
});
