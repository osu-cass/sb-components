import "jsdom-global/register";
import * as React from "react";
import { shallow, mount } from "enzyme";
import {
  mockBasicFilterCategories,
  mockAdvancedFilterCategoriesAll
} from "../../../mocks/Filter/mocks";
import {
  SearchAPIParamsModel,
  AdvancedFilterContainer,
  BasicFilterContainer,
  CombinedFilter,
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel
} from "../../index";

describe("FilterContainer", () => {
  const onFilterUpdated = jest.fn(
    (
      searchParams: SearchAPIParamsModel,
      basic: BasicFilterCategoryModel[],
      advanced: AdvancedFilterCategoryModel[]
    ) => {}
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

    //expand
    const expandBtn = wrapper
      .findWhere(node => node.type() === BasicFilterContainer)
      .find(".af-expand");
    expandBtn.simulate("click");
    expect(wrapper).toMatchSnapshot();

    let advFilter = wrapper.findWhere(
      node => node.type() === AdvancedFilterContainer
    );
    expect(advFilter).toBeDefined();

    //close
    expandBtn.simulate("click");
    expect(wrapper).toMatchSnapshot();
  });
});
