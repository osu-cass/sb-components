import * as CombinedFilterHelpers from "../CombinedFilterHelpers";
import * as Mocks from "./Mocks";
import {
  BasicFilterCategoryModel,
  OptionTypeModel,
  AdvancedFilterCategoryModel,
  FilterType
} from "../FilterModels";

const basicFilter: BasicFilterCategoryModel[] = [
  { ...Mocks.claimSelectedCategory, type: OptionTypeModel.DropDown }
];
const advancedFilter: AdvancedFilterCategoryModel[] = [
  {
    ...Mocks.claimSelectedCategory,
    isMultiSelect: false,
    displayAllButton: true
  }
];

describe("resetFilters", () => {
  it("deselects all filters", () => {
    const advancedFilterClone = JSON.parse(JSON.stringify(advancedFilter));
    const basicFilterClone = JSON.parse(JSON.stringify(basicFilter));
    const result = CombinedFilterHelpers.resetFilters(
      basicFilterClone,
      advancedFilterClone
    );

    expect(result.searchAPI).toEqual({});
    result.advancedFilter[0].filterOptions.forEach(o =>
      expect(o.isSelected).toBeFalsy()
    );
    result.basicFilter[0].filterOptions.forEach(o =>
      expect(o.isSelected).toBeFalsy()
    );
  });
});

describe("basicFilterUpdated", () => {
  it("updates search api", () => {
    const advancedFilterClone: AdvancedFilterCategoryModel[] = JSON.parse(
      JSON.stringify(advancedFilter)
    );
    const basicFilterClone: BasicFilterCategoryModel[] = JSON.parse(
      JSON.stringify(basicFilter)
    );
    const result = CombinedFilterHelpers.basicFilterUpdated(
      basicFilterClone,
      { subjects: ["MATH"] },
      advancedFilterClone,
      Mocks.searchModel,
      FilterType.Claim
    );

    expect(result.searchAPI.claims).toEqual(["MATH1", "MATH2"]);
  });

  it("updates corresponding category in advanced filter", () => {
    const advancedFilterClone: AdvancedFilterCategoryModel[] = JSON.parse(
      JSON.stringify(advancedFilter)
    );
    const basicFilterClone: BasicFilterCategoryModel[] = JSON.parse(
      JSON.stringify(basicFilter)
    );
    advancedFilterClone[0].filterOptions.forEach(o => (o.isSelected = false));

    const result = CombinedFilterHelpers.basicFilterUpdated(
      basicFilterClone,
      { subjects: ["MATH"] },
      advancedFilterClone,
      Mocks.searchModel,
      FilterType.Claim
    );

    expect(result.advancedFilter[0].filterOptions).toHaveLength(1);
    expect(result.advancedFilter[0].filterOptions[0]).toEqual({
      isSelected: true,
      key: "MATH1",
      label: "MATH1",
      filterType: FilterType.Claim
    });
  });
});
