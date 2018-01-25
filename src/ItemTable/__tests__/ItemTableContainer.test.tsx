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
  ItemCardModel
} from "../../index";
import {
  ItemTableContainerProps,
  ItemTableContainer
} from "../ItemTableContainer";

describe("ItemPageTable", () => {
  const rubrics: RubricModel[] = [];
  const selectedItem = itemCardList[0];
  const item: Resource<AboutItemModel> = {
    content: { ...AboutItemMockModel, itemCardViewModel: selectedItem },
    kind: "success"
  };

  const props: ItemTableContainerProps = {
    item,
    itemCards: itemCardList,
    onRowSelection: itemHandler,
    onItemSelection: itemHandler,
    isLinkTable: false
  };

  const wrapper = mount(<ItemTableContainer {...props} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("sorts list on header click", () => {
    tabClassNames.forEach(tab => {
      wrapper.find(`th.${tab}`).simulate("click");
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("calls onRowSelection()", () => {
    const items = wrapper.find("td.item");
    items.forEach(item => {
      item.simulate("click");
      expect(props.onRowSelection).toHaveBeenCalled();
    });
  });
});
