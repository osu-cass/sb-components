import "jsdom-global/register";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { itemCardList } from "../../../mocks/ItemCard/mocks";
import { tabClassNames } from "../../../mocks/ItemTable/mocks";
import { AboutItemMockModel } from "../../../mocks/AboutItem/mocks";
import { itemHandler } from "./mocks";

import {
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  ItemCardModel,
  headerColumns
} from "../../index";
import { ItemTableRowProps, ItemTableRow } from "../ItemTableRow";

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

  const wrapper = shallow(<ItemTableRow {...props} />);
  const wrapperExpanded = shallow(
    <ItemTableRow {...props} isExpanded={true} />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("matches expand snapshot", () => {
    expect(wrapperExpanded).toMatchSnapshot();
  });
});