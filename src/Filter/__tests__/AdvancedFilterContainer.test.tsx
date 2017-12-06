import * as React from "react";
import { AdvancedFilterContainer } from "../AdvancedFilterContainer";
import {
  mockAdvancedFilterCategoriesAll,
  mockAdvancedFilterCategoriesSelected
} from "../../../stories/Filter/mocks";
import { shallow } from "enzyme";

describe("AdvancedFilterContainer", () => {
  const wrapper = shallow(
    <AdvancedFilterContainer
      pageTitle="Advanced Filter"
      onUpdateFilter={() => {}}
      filterCategories={mockAdvancedFilterCategoriesAll}
    />
  );

  const wrapper1 = shallow(
    <AdvancedFilterContainer
      pageTitle="Advanced Filter"
      onUpdateFilter={() => {}}
      filterCategories={mockAdvancedFilterCategoriesSelected}
    />
  );

  it("expands and collapses on click", () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find(".filter-expand-btn").simulate("click");
    expect(wrapper).toMatchSnapshot();
    wrapper.find(".filter-expand-btn").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  it("resets filter options", () => {
    wrapper1
      .find(".filter-indicator")
      .at(0)
      .simulate("click");
    expect(wrapper1).toMatchSnapshot();
    wrapper1.find(".filter-reset-btn").simulate("click");
    expect(wrapper1).toMatchSnapshot();
  });
});
