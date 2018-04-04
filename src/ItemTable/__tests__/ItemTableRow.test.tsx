import "jsdom-global/register";
import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { itemCardList } from "@mocks/ItemCard/mocks";
import { tabClassNames } from "@mocks/ItemTable/mocks";
import { aboutItemMockModel } from "@mocks/index";
import { itemHandler } from "./mocks";
import {
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  ItemCardModel,
  headerColumns,
  ItemTableRowProps,
  ItemTableRow
} from "@src/index";

describe("ItemTableRow", () => {
  const rubrics: RubricModel[] = [];
  const selectedItem = itemCardList[0];

  const props: ItemTableRowProps = {
    rowData: selectedItem,
    hasControls: true,
    columns: headerColumns,
    isExpanded: false,
    onRowExpand: itemHandler,
    onRowSelect: itemHandler
  };

  const wrapper = mount(
    <table>
      <tbody>
        <ItemTableRow {...props} />
      </tbody>
    </table>
  );
  const wrapperExpanded = shallow(
    <ItemTableRow {...props} isExpanded={true} />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("matches expand snapshot", () => {
    expect(wrapperExpanded).toMatchSnapshot();
  });

  it("calls row events", () => {
    const item = wrapper.find("td.item");
    item.simulate("click");
    expect(props.onRowSelect).toHaveBeenCalled();
    expect(props.onRowExpand).toHaveBeenCalled();
  });
});
