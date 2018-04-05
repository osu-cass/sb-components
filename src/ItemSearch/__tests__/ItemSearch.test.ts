import { ItemSearch } from "../ItemSearch";
import { itemSearchModel, mockSeachAPI } from "../../../mocks/ItemSearch/mocks";
import { resetResource } from "../../ItemPage/ItemPageModels";
import { SearchAPIParamsModel } from "../ItemSearchModels";
import { GradeLevels } from "../../GradeLevels/GradeLevels";
import { FilterCategoryModel, FilterType } from "../../Filter/FilterModels";

describe("updateDependentSearchParams", () => {
  it("works for empty object", () => {
    const result = ItemSearch.updateDependentSearchParams({}, itemSearchModel);

    expect(result).toEqual({});
  });

  it("filters dependent categories", () => {
    const searchParams: SearchAPIParamsModel = {
      subjects: ["MATH"],
      claims: ["ELA1", "MATH1"],
      interactionTypes: ["IT1", "IT2", "IT3", "IT4", "IT5"],
      targets: ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    };
    const result = ItemSearch.updateDependentSearchParams(
      searchParams,
      itemSearchModel
    );

    expect(result).toEqual({
      subjects: ["MATH"],
      claims: ["MATH1"],
      interactionTypes: ["IT1", "IT2", "IT3"],
      targets: ["A", "B", "C", "D"]
    });
  });

  it("does not filter non dependent categories", () => {
    const searchParams: SearchAPIParamsModel = {
      subjects: ["MATH"],
      claims: ["MATH1"],
      interactionTypes: ["IT1", "IT2", "IT4"],
      targets: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      catOnly: true,
      calculator: false,
      gradeLevels: GradeLevels.High
    };
    const result = ItemSearch.updateDependentSearchParams(
      searchParams,
      itemSearchModel
    );

    expect(result).toEqual({
      subjects: ["MATH"],
      claims: ["MATH1"],
      interactionTypes: ["IT1", "IT2"],
      targets: ["A", "B", "C", "D"],
      catOnly: true,
      calculator: false,
      gradeLevels: GradeLevels.High
    });
  });
});
