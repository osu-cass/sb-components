import * as React from "react";
import { BasicFilterContainer } from "../BasicFilterContainer";
import { BasicFilter } from "../BasicFilter";
import { BasicFilterCategoryModel } from "../FilterModels";
import { mockBasicFilterCategories } from "../../../stories/Filter/mocks";
import { shallow } from "enzyme";

describe("BasicFilterContainer", () => {
  const updateFilter = (filterCategories: BasicFilterCategoryModel[]) => {
    wrapper.setProps({ filterCategories });
  };

  let wrapper = shallow(
    <BasicFilterContainer
      filterCategories={mockBasicFilterCategories}
      onUpdateFilter={updateFilter}
      containsAdvancedFilter={false}
      handleAdvancedFilterExpand={() => {}}
    />,
    { lifecycleExperimental: true }
  );

  it("has proper number of BasicFilters", () => {
    expect(wrapper.findWhere(node => node.type() === BasicFilter)).toHaveLength(
      2
    );
  });

  it("can select dropdown filter options", () => {
    const options = [7, 56, 960];
    options.forEach(opt => {
      wrapper
        .findWhere(node => node.type() === BasicFilter)
        .at(0)
        .dive()
        .find("select")
        .simulate("change", { target: { value: opt } });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("can select radio button filter options", () => {
    const options = ["ELA", "Math"];
    let i = 0;
    options.forEach(opt => {
      wrapper
        .findWhere(node => node.type() === BasicFilter)
        .at(1)
        .dive()
        .find("form")
        .find("input")
        .at(i)
        .simulate("change", { target: { value: opt } });
      expect(wrapper).toMatchSnapshot();
      i++;
    });
  });
});
