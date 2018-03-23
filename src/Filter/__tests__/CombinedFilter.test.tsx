import "jsdom-global/register";
import * as React from "react";
import { shallow, mount } from "enzyme";
import {
  mockBasicFilterCategories,
  mockAdvancedFilterCategoriesAll
} from "@mocks/Filter/mocks";
import {
  SearchAPIParamsModel,
  AdvancedFilterContainer,
  BasicFilterContainer,
  CombinedFilter,
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel
} from "@src/index";

describe("FilterContainer", () => {
  const onFilterUpdated = jest.fn(
    (
      searchParams: SearchAPIParamsModel,
      basic: BasicFilterCategoryModel[],
      advanced: AdvancedFilterCategoryModel[]
    ) => {
      return;
    }
  );

  const wrapper = mount(
    <CombinedFilter
      basicFilter={mockBasicFilterCategories}
      advancedFilter={mockAdvancedFilterCategoriesAll}
      searchAPI={{}}
      onFilterUpdated={onFilterUpdated}
    />
  );

  it("renders", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("toggles the advanced filter", () => {
    expect(wrapper).toMatchSnapshot();

    const expandBtn = wrapper
      .findWhere(node => node.type() === BasicFilterContainer)
      .find(".af-expand");
    expandBtn.simulate("click");
    expect(wrapper).toMatchSnapshot();

    const advFilter = wrapper.findWhere(
      node => node.type() === AdvancedFilterContainer
    );
    expect(advFilter).toBeDefined();

    expandBtn.simulate("click");
    expect(wrapper).toMatchSnapshot();
  });
});
