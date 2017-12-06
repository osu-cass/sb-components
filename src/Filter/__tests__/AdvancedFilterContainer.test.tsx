import * as React from "react";
import { AdvancedFilterContainer } from "../AdvancedFilterContainer";
import { mockAdvancedFilterCategoriesAll } from "../../../stories/Filter/mocks";
import { shallow } from "enzyme";

describe("AdvancedFilterContainer", () => {
  const wrapper = shallow(
    <AdvancedFilterContainer
      pageTitle="Advanced Filter"
      onUpdateFilter={() => {}}
      filterCategories={mockAdvancedFilterCategoriesAll}
    />
  );
  it("expands and collapses on click", () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find(".filter-expand-btn").simulate("click");
    expect(wrapper).toMatchSnapshot();
    wrapper.find(".filter-expand-btn").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  // add mock props that are selected and remove the tags and test reset filter
  it("resets filter options", () => {});
});
