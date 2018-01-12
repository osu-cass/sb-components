import * as React from "react";
import { AdvancedFilterContainer } from "../AdvancedFilterContainer";
import { AdvancedFilterCategoryModel } from "../FilterModels";
import {
  mockAdvancedFilterCategoriesAll,
  mockAdvancedFilterCategoriesSelected
} from "../../../mocks/Filter/mocks";
import { shallow } from "enzyme";

describe("AdvancedFilterContainer", () => {
  const updateFilter = jest.fn(
    (filterCategories: AdvancedFilterCategoryModel[]) => {
      wrapper.setProps({ filterCategories });
    }
  );

  const wrapper = shallow(
    <AdvancedFilterContainer
      pageTitle="Advanced Filter"
      onUpdateFilter={updateFilter}
      filterCategories={mockAdvancedFilterCategoriesAll}
    />
  );

  const wrapper1 = shallow(
    <AdvancedFilterContainer
      onUpdateFilter={updateFilter}
      filterCategories={mockAdvancedFilterCategoriesSelected}
    />
  );

  it("expands and collapses on click", () => {
    wrapper.find(".filter-expand-btn").simulate("click");
    expect(wrapper).toMatchSnapshot();
    wrapper.find(".filter-expand-btn").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  it("'Reset Filters' button resets filters", () => {
    wrapper1
      .findWhere(node => node.type() === "button")
      .at(0)
      .simulate("click");
    expect(wrapper1).toMatchSnapshot();
    wrapper1.find(".filter-reset-btn").simulate("click");
    expect(wrapper1).toMatchSnapshot();
  });
});
