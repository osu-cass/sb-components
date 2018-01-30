import * as React from "react";
import { FilterContainer } from "../FilterContainer";
import {
  BasicFilterCategoryModel,
  AdvancedFilterCategoryModel
} from "../FilterModels";
import {
  mockBasicFilterCategories,
  mockAdvancedFilterCategoriesAll
} from "../../../mocks/Filter/mocks";
import { shallow } from "enzyme";
import { BasicFilterContainer } from "../BasicFilterContainer";

describe("FilterContainer", () => {
  const updateBasicFilter = (
    basicFilterCategories: BasicFilterCategoryModel[]
  ) => {
    wrapper.setProps({ basicFilterCategories });
  };

  const updateAdvancedFilter = (
    advancedFilterCategories: AdvancedFilterCategoryModel[]
  ) => {
    wrapper.setProps({ advancedFilterCategories });
  };

  const wrapper = shallow(
    <FilterContainer
      basicFilterCategories={mockBasicFilterCategories}
      onUpdateBasicFilter={updateBasicFilter}
      advancedFilterCategories={mockAdvancedFilterCategoriesAll}
      onUpdateAdvancedFilter={updateAdvancedFilter}
    />,
    { lifecycleExperimental: true }
  );

  it("expands the advanced filter", () => {
    expect(wrapper).toMatchSnapshot();
    for (let i = 0; i < 2; i++) {
      wrapper
        .findWhere(node => node.type() === BasicFilterContainer)
        .dive()
        .find(".af-expand")
        .simulate("click");
      expect(wrapper).toMatchSnapshot();
    }
  });
});
