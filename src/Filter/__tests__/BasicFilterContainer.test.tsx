import * as React from "react";
import { BasicFilterContainer } from "../BasicFilterContainer";
import { BasicFilter } from "../BasicFilter";
import { BasicFilterCategoryModel } from "../FilterModels";
import { mockBasicFilterCategories } from "mocks/Filter/mocks";
import { shallow } from "enzyme";

describe("BasicFilterContainer", () => {
  const AdvFilExpand = jest.fn();

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

  let wrapper1 = shallow(
    <BasicFilterContainer
      filterCategories={mockBasicFilterCategories}
      onUpdateFilter={updateFilter}
      containsAdvancedFilter={true}
      handleAdvancedFilterExpand={AdvFilExpand}
    />,
    { lifecycleExperimental: true }
  );

  it("has proper number of BasicFilters", () => {
    expect(wrapper.findWhere(node => node.type() === BasicFilter)).toHaveLength(
      2
    );
  });

  it("can select dropdown filter options", () => {
    const options = ["default", 7, 56, 960];
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

  it("resets filters on keyboard events", () => {
    const keyCodes = [0, 13, 32];
    keyCodes.forEach(key => {
      wrapper
        .findWhere(node => node.type() === BasicFilter)
        .at(0)
        .dive()
        .find("select")
        .simulate("keyDown", { keyCode: key });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("expands the advanced filter", () => {
    expect(wrapper1).toMatchSnapshot();
    wrapper1.setState({ expanded: false });
    wrapper1.findWhere(node => node.type() === "button").simulate("click");
    expect(wrapper1).toMatchSnapshot();
    wrapper1.findWhere(node => node.type() === "button").simulate("click");
    expect(wrapper1).toMatchSnapshot();
  });
});
