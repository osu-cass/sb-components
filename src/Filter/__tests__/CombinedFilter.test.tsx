import "jsdom-global/register";
import * as React from "react";
import * as CombinedFilterHelpers from "../CombinedFilterHelpers";
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
  CombinedFilterProps,
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel
} from "@src/index";
import { mockSeachAPI } from "./Mocks";

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
  it("filter updates", () => {
    expect(
      onFilterUpdated(
        mockSeachAPI,
        mockBasicFilterCategories,
        mockAdvancedFilterCategoriesAll
      )
    ).toMatchSnapshot();
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
