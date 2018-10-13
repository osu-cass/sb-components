import * as React from "react";
import { BasicFilterContainer } from "../BasicFilterContainer";
import { BasicFilter } from "../BasicFilter";
import { BasicFilterCategoryModel } from "../FilterModels";
import { mockBasicFilterCategories } from "../../../mocks/Filter/mocks";
import { shallow } from "enzyme";
import { Select } from "../../Select/Select";
import { AdvancedFilterContainer } from "../AdvancedFilterContainer";

describe("BasicFilterContainer", () => {
  const advFilExpand = jest.fn();

  const updateFilter = (filterCategories: BasicFilterCategoryModel[]) => {
    wrapper.setProps({ filterCategories });
  };

  const wrapper = shallow(
    <BasicFilterContainer
      filterCategories={mockBasicFilterCategories}
      onUpdateFilter={updateFilter}
      containsAdvancedFilter={false}
      handleAdvancedFilterExpand={() => {
        return;
      }}
    />,
    { lifecycleExperimental: true }
  );

  const wrapper1 = shallow(
    <BasicFilterContainer
      filterCategories={mockBasicFilterCategories}
      onUpdateFilter={updateFilter}
      containsAdvancedFilter={true}
      handleAdvancedFilterExpand={advFilExpand}
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
        .findWhere(node => node.type() === Select)
        .simulate("change", { target: { value: opt } });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("hide select message if disabled", () => {
    const gradeDropDownModel = mockBasicFilterCategories[0];
    const view = shallow(
      // tslint:disable-next-line:no-empty
      <BasicFilter {...gradeDropDownModel} selectedHandler={() => {}} />
    );
    expect(view.findWhere(a => a.text().includes("Select")).length).toEqual(0);
    expect(view).toMatchSnapshot();
    const options = ["default", 7, 56, 960];
  });

  it("can select radio button filter options", () => {
    const options = ["ELA", "Math"];
    let i = 0;
    options.forEach(opt => {
      wrapper
        .findWhere(node => node.type() === BasicFilter)
        .at(1)
        .dive()
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
        .findWhere(node => node.type() === Select)
        .simulate("keyDown", { keyCode: key });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("expands the advanced filter", () => {
    expect(wrapper1).toMatchSnapshot();
    wrapper1.setState({ expanded: false });
    const expandButton = wrapper1
      .findWhere(node => node.type() === "button")
      .at(1);

    expandButton.simulate("click");
    expect(wrapper1).toMatchSnapshot();
    const advFilter = wrapper1.findWhere(
      node => node.type() === AdvancedFilterContainer
    );

    expect(advFilter).toBeDefined();
    expect(advFilExpand).toBeCalled();

    expandButton.simulate("click");
    expect(wrapper1).toMatchSnapshot();
  });
});
