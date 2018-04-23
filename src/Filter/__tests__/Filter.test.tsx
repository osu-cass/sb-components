import * as Mocks from "./Mocks";
import * as CardMocks from "../../../mocks/ItemCard/mocks";
import {
  GradeLevel,
  GradeLevels,
  SubjectModel,
  FilterCategoryModel,
  FilterType,
  Filter
} from "@src/index";

const searchTargets = Mocks.searchModel.targets || [];
const searchClaims = Mocks.searchModel.claims || [];
const searchItemTypes = Mocks.searchModel.interactionTypes || [];

describe("Filter.getSelectedCodes", () => {
  it("No selections", () => {
    const categories = [Mocks.claimCategory, Mocks.subjectSelectedCategory];
    const selectedCodes = Filter.getSelectedCodes(FilterType.Claim, categories);

    expect(selectedCodes).toHaveLength(0);
  });

  it("all Selections", () => {
    const categories = [
      Mocks.claimSelectedCategory,
      Mocks.subjectSelectedCategory
    ];
    const selectedCodes = Filter.getSelectedCodes(FilterType.Claim, categories);
    expect(selectedCodes).toHaveLength(2);

    Mocks.claimSelectedCategory.filterOptions.forEach(element => {
      expect(selectedCodes).toContain(element.key);
    });
  });

  it("Some Selections", () => {
    const categories = [
      Mocks.claimSelectedCategory,
      Mocks.subjectSelectedCategory
    ];
    const selectedCodes = Filter.getSelectedCodes(
      FilterType.Subject,
      categories
    );
    expect(selectedCodes).toHaveLength(1);

    Mocks.subjectSelectedCategory.filterOptions.forEach(element => {
      if (element.isSelected) {
        expect(selectedCodes).toContain(element.key);
      }
    });
  });

  it("Some Selections, grade", () => {
    const categories = [
      Mocks.claimSelectedCategory,
      Mocks.gradeSelectedCategory
    ];
    const selectedCodes = Filter.getSelectedCodes(FilterType.Grade, categories);
    expect(selectedCodes).toHaveLength(2);

    Mocks.gradeSelectedCategory.filterOptions.forEach(element => {
      if (element.isSelected) {
        expect(selectedCodes).toContain(element.key);
      }
    });
  });

  it("No matching category", () => {
    const categories = [Mocks.claimCategory, Mocks.subjectSelectedCategory];
    const selectedCodes = Filter.getSelectedCodes(FilterType.CAT, categories);

    expect(selectedCodes).toBeUndefined();
  });

  it("Empty categories", () => {
    const categories: FilterCategoryModel[] = [];
    const selectedCodes = Filter.getSelectedCodes(FilterType.CAT, categories);
    expect(selectedCodes).toBeUndefined();
  });

  it("Empty options", () => {
    const categories = [Mocks.claimEmptyCategory];
    const selectedCodes = Filter.getSelectedCodes(FilterType.Claim, categories);
    expect(selectedCodes).toHaveLength(0);
  });
});

describe("Filter.getSelectedGrade", () => {
  it("selected grades", () => {
    const categories = [Mocks.claimCategory, Mocks.gradeSelectedCategory];
    const gradeCode = Filter.getSelectedGrade(categories);
    expect(gradeCode).toEqual(63);
  });

  it("no selected", () => {
    const categories = [Mocks.claimCategory, Mocks.gradeCategory];
    const gradeCode = Filter.getSelectedGrade(categories);
    expect(gradeCode).toEqual(GradeLevels.NA);
  });

  it("no category", () => {
    const categories = [Mocks.claimCategory];
    const gradeCode = Filter.getSelectedGrade(categories);
    expect(gradeCode).toBeUndefined();
  });

  it("no options", () => {
    const categories = [Mocks.gradeEmptyCategory];
    const gradeCode = Filter.getSelectedGrade(categories);
    expect(gradeCode).toEqual(GradeLevels.NA);
  });
});

describe("Filter.getSelectedTargets", () => {
  it("Selections", () => {
    const categories = [Mocks.targetSelectionsCategory];
    const result = Filter.getSelectedTargets(categories);
    expect(result).toHaveLength(1);
    expect(result).toContain("133");
  });

  it("No selections", () => {
    const categories = [Mocks.targetCategory];
    const result = Filter.getSelectedTargets(categories);
    expect(result).toHaveLength(0);
  });

  it("Empty", () => {
    const categories = [Mocks.targetEmptyCategory];
    const result = Filter.getSelectedTargets(categories);
    expect(result).toHaveLength(0);
  });
});
describe("Filter.filterSubjects", () => {
  it("filtering some", () => {
    const result = Filter.filterStringTypes(Mocks.subjects, ["ELA"]);
    const expected = Mocks.subjects.find(s => s.code === "ELA");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering some other", () => {
    const result = Filter.filterStringTypes(Mocks.subjects, ["MATH"]);
    const expected = Mocks.subjects.find(s => s.code === "MATH");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering all", () => {
    const result = Filter.filterStringTypes(Mocks.subjects, ["MATH", "ELA"]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.subjects);
  });

  it("filtering none", () => {
    const result = Filter.filterStringTypes(Mocks.subjects);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.subjects);
  });

  it("filtering empty", () => {
    const result = Filter.filterStringTypes(Mocks.subjects, [""]);
    expect(result).toHaveLength(0);
  });
  it("filtering bad subject", () => {
    const result = Filter.filterStringTypes(Mocks.subjects, ["nosubject"]);
    expect(result).toHaveLength(0);
  });

  it("filtering claim", () => {
    const result = Filter.filterStringTypes(Mocks.claims, ["ELA1"]);
    const expected = Mocks.claims.find(c => c.code === "ELA1");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });
});

describe("Filter.getSubjectClaimCodes", () => {
  it("all", () => {
    const result = Filter.getSubjectClaimCodes(Mocks.subjects);
    expect(result).toHaveLength(4);
  });

  it("one", () => {
    const result = Filter.getSubjectClaimCodes([Mocks.subjects[0]]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.subjects[0].claimCodes);
  });

  it("no options", () => {
    const result = Filter.getSubjectClaimCodes([
      { ...Mocks.subjects[0], claimCodes: [] }
    ]);
    expect(result).toHaveLength(0);
  });

  it("none", () => {
    const result = Filter.getSubjectClaimCodes([]);
    expect(result).toHaveLength(0);
  });
});
describe("Filter.getSubjectInteractionTypes", () => {
  it("all", () => {
    const result = Filter.getSubjectInteractionTypes(Mocks.subjects);
    expect(result).toHaveLength(4);
  });

  it("one", () => {
    const result = Filter.getSubjectInteractionTypes([Mocks.subjects[0]]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.subjects[0].interactionTypeCodes);
  });

  it("no options", () => {
    const result = Filter.getSubjectInteractionTypes([
      { ...Mocks.subjects[0], interactionTypeCodes: [] }
    ]);
    expect(result).toHaveLength(0);
  });

  it("none", () => {
    const result = Filter.getSubjectInteractionTypes([]);
    expect(result).toHaveLength(0);
  });
});
describe("Filter.getClaimTargetCodes", () => {
  it("all", () => {
    const result = Filter.getClaimTargetCodes(Mocks.claims);
    expect(result).toHaveLength(8);
  });

  it("one", () => {
    const result = Filter.getClaimTargetCodes([Mocks.claims[0]]);
    expect(result).toHaveLength(4);
    expect(result).toEqual(Mocks.claims[0].targetCodes);
  });

  it("no options", () => {
    const result = Filter.getClaimTargetCodes([
      { ...Mocks.claims[0], targetCodes: [] }
    ]);
    expect(result).toHaveLength(0);
  });

  it("none", () => {
    const result = Filter.getClaimTargetCodes([]);
    expect(result).toHaveLength(0);
  });
});
describe("Filter.getCurrentClaimsFilter", () => {
  it("one subject", () => {
    const subject = Mocks.subjects.find(s => s.code === "MATH");
    const expected = Mocks.claims.find(c => c.code === "MATH1");
    const filteredSubjects = subject ? [subject] : [];
    const result = Filter.getCurrentClaimsFilter(
      searchClaims,
      filteredSubjects
    );

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("all subjects", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentClaimsFilter(
      searchClaims,
      filteredSubjects
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.claims);
  });

  it("no subjects", () => {
    const filteredSubjects: SubjectModel[] = [];
    const result = Filter.getCurrentClaimsFilter(
      searchClaims,
      filteredSubjects
    );

    expect(result).toBeUndefined();
  });

  it("subjects no selections", () => {
    const filteredSubjects: SubjectModel[] = [];
    const result = Filter.getCurrentClaimsFilter(searchClaims, []);

    expect(result).toBeUndefined();
  });

  it("no search model", () => {
    const filteredSubjects: SubjectModel[] = [];
    const result = Filter.getCurrentClaimsFilter([], filteredSubjects);

    expect(result).toBeUndefined();
  });
});

describe("Filter.getCurrentInteractionTypes", () => {
  it("one subject", () => {
    const subject = Mocks.subjects.find(s => s.code === "MATH");
    const expected = Mocks.interactionTypes.find(c => c.code === "ITM1");
    const filteredSubjects = subject ? [subject] : [];
    const result = Filter.getCurrentInteractionTypes(
      searchItemTypes,
      filteredSubjects
    );

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("all subjects", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentInteractionTypes(
      searchItemTypes,
      filteredSubjects
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.interactionTypes);
  });

  it("no subjects", () => {
    const filteredSubjects: SubjectModel[] = [];
    const result = Filter.getCurrentInteractionTypes(
      searchItemTypes,
      filteredSubjects
    );

    expect(result).toBeUndefined();
  });

  it("subjects no selections", () => {
    const result = Filter.getCurrentInteractionTypes(searchItemTypes, []);

    expect(result).toBeUndefined();
  });

  it("no search model", () => {
    const filteredSubjects: SubjectModel[] = [];
    const result = Filter.getCurrentInteractionTypes([], filteredSubjects);

    expect(result).toBeUndefined();
  });
});
describe("Filter.getCurrentTargets", () => {
  it("one claim", () => {
    const claim = Mocks.claims.find(c => c.code === "ELA1");
    const expected = Mocks.targets.find(c => c.name === "ELA1");
    const claims = claim ? [claim] : [];
    const result = Filter.getCurrentTargets(
      searchTargets,
      {
        claims: ["ELA1"]
      },
      claims
    );

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("all claims", () => {
    const result = Filter.getCurrentTargets(
      searchTargets,
      { claims: ["ELA1", "MATH1"] },
      Mocks.claims
    );

    expect(result).toHaveLength(3);
    expect(result).toContain(Mocks.targets[0]);
    expect(result).toContain(Mocks.targets[1]);
    expect(result).toContain(Mocks.targets[2]);
  });

  it("no claims", () => {
    const result = Filter.getCurrentTargets(searchTargets, {}, []);

    expect(result).toBeUndefined();
  });

  it("no search model", () => {
    const result = Filter.getCurrentTargets([], {}, []);

    expect(result).toBeUndefined();
  });
});

describe("Filter.getUpdatedSearchFilters", () => {
  return;
});

describe("Filter.hideTargetOptions", () => {
  it("no target category", () => {
    const categories = [Mocks.claimCategory, Mocks.subjectSelectedCategory];
    const cards = CardMocks.sortableItemCards;

    const result = Filter.hideTargetOptions(categories, cards);
    expect(result).toEqual(categories);
  });

  it("happy case", () => {
    const categories = [
      {
        ...Mocks.targetCategory,
        filterOptions: [
          {
            label: "A",
            key: "133",
            isSelected: true,
            filterType: FilterType.Target
          },
          {
            label: "E",
            key: "133",
            isSelected: true,
            filterType: FilterType.Target
          }
        ]
      }
    ];
    const expectedResult = [
      {
        ...Mocks.targetCategory,
        filterOptions: [
          {
            label: "A",
            key: "133",
            isSelected: true,
            filterType: FilterType.Target
          }
        ]
      }
    ];

    const cards = CardMocks.sortableItemCards;

    const result = Filter.hideTargetOptions(categories, cards);
    expect(result).toEqual(expectedResult);
  });
});
