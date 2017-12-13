import {
  SearchAPIParamsModel,
  SearchFilterStringTypes
} from "../ItemSearchModels";
import { ItemSearch } from "../ItemSearch";
import { ItemCardModel } from "../../ItemCard/ItemCardModels";
import {
  itemCards,
  genericSearchStringTypes,
  resultFilterOptionModel,
  resultFilterOptionModelSelected,
  resultFilterGradeModel,
  resultFilterGradeModelSelectedSingle,
  resultFilterGradeModelSelectedMultiple
} from "./ItemSearchModelsTestData";

import { GradeLevels, GradeLevel } from "../../GradeLevels/GradeLevels";
import { FilterType } from "../../Filter/FilterModels";

describe("ItemSearch.filterItemCards", () => {
  it("filters with empty filter", () => {
    const params: SearchAPIParamsModel = {};
    const result = ItemSearch.filterItemCards(itemCards, params);

    expect(result).toHaveLength(itemCards.length);
    itemCards.forEach(card => expect(result).toContain(card));
  });

  it("works without cards", () => {
    const params: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Middle,
      subjects: ["ELA"],
      claims: ["ELA4"]
    };
    const result = ItemSearch.filterItemCards([], params);
    expect(result).toHaveLength(0);
  });

  it("filters based on subject, claim, and target", () => {
    const params: SearchAPIParamsModel = {
      subjects: ["ELA"],
      claims: ["ELA4"],
      targets: [2832]
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards.filter(
      c =>
        c.subjectCode === "ELA" &&
        c.claimCode === "ELA4" &&
        c.targetHash === 2832
    );

    expect(result).toHaveLength(1);
    expect(result).toContain(expectedCards[0]);
  });

  it("filters based on grade", () => {
    const params: SearchAPIParamsModel = {
      gradeLevels: GradeLevels.Middle
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards.filter(c =>
      GradeLevel.gradeLevelContains(GradeLevels.Middle, c.grade)
    );

    expect(result).toHaveLength(expectedCards.length);
    expectedCards.forEach(card => expect(result).toContain(card));
  });

  it("filters for cat items only", () => {
    const params: SearchAPIParamsModel = {
      catOnly: true
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards.filter(c => !c.isPerformanceItem);

    expect(result).toHaveLength(expectedCards.length);
    expectedCards.forEach(card => expect(result).toContain(card));
  });

  it("filters for performance items only", () => {
    const params: SearchAPIParamsModel = {
      performanceOnly: true
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards.filter(c => c.isPerformanceItem);

    expect(result).toHaveLength(expectedCards.length);
    expectedCards.forEach(card => expect(result).toContain(card));
  });
});

describe("ItemSearch.searchOptionFilterString", () => {
  it("empty options", () => {
    const optionParam: SearchFilterStringTypes[] = [];
    const filterParam = FilterType.Subject;

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam
    );
    expect(result).toEqual([]);
  });

  it("filled options length", () => {
    const optionParam = genericSearchStringTypes;
    const filterParam = FilterType.Subject;

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam
    );
    expect(result.length).toEqual(3);
  });

  it("filled options", () => {
    const optionParam = genericSearchStringTypes;
    const filterParam = FilterType.Subject;

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam
    );
    expect(result).toEqual(resultFilterOptionModel);
  });

  it("selected options", () => {
    const optionParam = genericSearchStringTypes;
    const filterParam = FilterType.Subject;
    const selectedCodesParam = ["t1", "t3"];

    const result = ItemSearch.searchOptionFilterString(
      optionParam,
      filterParam,
      selectedCodesParam
    );
    expect(result).toEqual(resultFilterOptionModelSelected);
  });
});

// TODO: fix key to display grade code not label.
describe("ItemSearch.searchOptionToFilterGrade", () => {
  it("empty options", () => {
    const optionParam: GradeLevels[] = [];
    const filterParam = FilterType.Grade;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam
    );
    expect(result).toEqual([]);
  });

  it("filled options", () => {
    const optionParam: GradeLevels[] = [GradeLevels.Grade3, GradeLevels.Grade4];
    const filterParam = FilterType.Grade;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam
    );
    expect(result).toEqual(resultFilterGradeModel);
  });

  it("filled options Selected single", () => {
    const optionParam: GradeLevels[] = [GradeLevels.Grade3, GradeLevels.Grade4];
    const filterParam = FilterType.Grade;
    const selectedCodeParam = GradeLevels.Grade3;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultFilterGradeModelSelectedSingle);
  });

  it("filled options Selected multiple", () => {
    const optionParam: GradeLevels[] = [GradeLevels.Grade3, GradeLevels.Grade4];
    const filterParam = FilterType.Grade;
    const selectedCodeParam = GradeLevels.Grade3 | GradeLevels.Grade4;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultFilterGradeModelSelectedMultiple);
  });
});
