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
    const result = CombinedFilterHelpers.resetFilters(
      basicFilter,
      advancedFilter
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
    const result = CombinedFilterHelpers.basicFilterUpdated(
      basicFilter,
      { claims: [] },
      advancedFilter,
      Mocks.searchModel,
      FilterType.Claim
    );

    expect(result.searchAPI).toEqual({});
  });

  it;
});
