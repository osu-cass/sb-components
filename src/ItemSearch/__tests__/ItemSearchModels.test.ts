import {
  SearchAPIParamsModel,
  SearchFilterStringTypes,
  SearchFilterModelTypes
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
  resultFilterGradeModelSelectedMultiple,
  searchOptionFilterTarget,
  resultSearchOptionFilterTarget,
  resultSearchOptionFilterTargetSelectedSingle,
  resultSearchOptionFilterTargetSelectedMultiple,
  mockSeachAPI,
  resultFilterOptionModelClaim,
  resultFilterOptionModelIT,
  resultFilterOptionModelSubject,
  gradeSearchStringTypes,
  resultFilterOptionModelGrade,
  targetSearchStringTypes,
  resultFilterOptionModeltarget,
  resultFilterOptionModelTechType,
  techtypeSearchStringTypes
} from "../../../mocks/ItemSearch/mocks";

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

  it("filters for calculator off", () => {
    const params: SearchAPIParamsModel = {
      calculator: false
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards.filter(c => c.calculator === false);

    expect(result).toHaveLength(expectedCards.length);
    expectedCards.forEach(card => expect(result).toContain(card));
  });

  it("filters for calculator on", () => {
    const params: SearchAPIParamsModel = {
      calculator: true
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards.filter(c => c.calculator === true);

    expect(result).toHaveLength(expectedCards.length);
    expectedCards.forEach(card => expect(result).toContain(card));
  });

  it("filters for calculator undefined", () => {
    const params: SearchAPIParamsModel = {
      calculator: undefined
    };
    const result = ItemSearch.filterItemCards(itemCards, params);
    const expectedCards = itemCards;

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
    const selectedCodeParam = GradeLevels.Grade3 || GradeLevels.Grade4;

    const result = ItemSearch.searchOptionToFilterGrade(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultFilterGradeModelSelectedMultiple);
  });
});

describe("ItemSearch.searchOptionToFilterTarget", () => {
  it("empty options", () => {
    const optionParam = [];
    const filterParam = FilterType.Target;

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam
    );
    expect(result).toEqual([]);
  });

  it("filled options", () => {
    const optionParam = searchOptionFilterTarget;
    const filterParam = FilterType.Target;

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam
    );
    expect(result).toEqual(resultSearchOptionFilterTarget);
  });

  it("selected options single", () => {
    const optionParam = searchOptionFilterTarget;
    const filterParam = FilterType.Target;
    const selectedCodeParam = [1];

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultSearchOptionFilterTargetSelectedSingle);
  });

  it("selected options multiple", () => {
    const optionParam = searchOptionFilterTarget;
    const filterParam = FilterType.Target;
    const selectedCodeParam = [1, 3];

    const result = ItemSearch.searchOptionToFilterTarget(
      optionParam,
      filterParam,
      selectedCodeParam
    );
    expect(result).toEqual(resultSearchOptionFilterTargetSelectedMultiple);
  });
});

describe("ItemSearch.getTechnologyTypeCodes", () => {
  it("empty type code", () => {
    const searchParam: SearchAPIParamsModel = {};

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual([]);
  });

  it("type code CAT", () => {
    const searchParam: SearchAPIParamsModel = { catOnly: false };

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual(["CAT"]);
  });

  it("type code Performance", () => {
    const searchParam: SearchAPIParamsModel = { performanceOnly: false };

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual(["Performance"]);
  });

  it("type code CAT & Performance", () => {
    const searchParam: SearchAPIParamsModel = {
      performanceOnly: false,
      catOnly: false
    };

    const result = ItemSearch.getTechnologyTypeCodes(searchParam);
    expect(result).toEqual(["CAT", "Performance"]);
  });
});

describe("ItemSearch.getFilterOptionModel", () => {
  it("claims options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "claims",
      code: FilterType.Claim,
      filterOptions: genericSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelClaim);
  });

  it("InteractionType options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "InteractionType",
      code: FilterType.InteractionType,
      filterOptions: genericSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelIT);
  });

  it("Subject options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "Subject",
      code: FilterType.Subject,
      filterOptions: genericSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelSubject);
  });

  it("Grade options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "Grade",
      code: FilterType.Grade,
      filterOptions: gradeSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelGrade);
  });

  it("Target options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "Target",
      code: FilterType.Target,
      filterOptions: targetSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModeltarget);
  });

  it("TechnologyType options", () => {
    const filterParam: SearchFilterModelTypes = {
      label: "TechnologyType",
      code: FilterType.TechnologyType,
      filterOptions: techtypeSearchStringTypes
    };
    const searchApiParam = mockSeachAPI;

    const result = ItemSearch.getFilterOptionModel(filterParam, searchApiParam);
    expect(result).toEqual(resultFilterOptionModelTechType);
  });
});
