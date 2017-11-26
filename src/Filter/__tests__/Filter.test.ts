import { Filter } from "../Filter";
import * as Mocks from "./Mocks";
import { FilterType } from "../AdvancedFilterModel";
import { GradeLevel, GradeLevels } from "../../GradeLevels/GradeLevels";

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
    const categories = [];
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

describe("Filter.getSelectedFlag", () => {
  it("flag False", () => {
    const categories = [Mocks.performanceFalseCategory];
    const result = Filter.getSelectedFlag(FilterType.Performance, categories);
    expect(result).toEqual(false);
  });

  it("flag True", () => {
    const categories = [Mocks.performanceTruthCategory];
    const result = Filter.getSelectedFlag(FilterType.Performance, categories);
    expect(result).toEqual(true);
  });

  it("empty", () => {
    const categories = [Mocks.performanceEmptyCategory];
    const result = Filter.getSelectedFlag(FilterType.Performance, categories);
    expect(result).toBeUndefined();
  });
});
describe("Filter.getSelectedTargets", () => {
  it("Selections", () => {
    const categories = [Mocks.targetSelectionsCategory];
    const result = Filter.getSelectedTargets(categories);
    expect(result).toHaveLength(1);
    expect(result).toContain(133);
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
    const result = Filter.filterSubjects(Mocks.subjects, ["ELA"]);
    const expected = Mocks.subjects.find(s => s.code === "ELA");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering some other", () => {
    const result = Filter.filterSubjects(Mocks.subjects, ["MATH"]);
    const expected = Mocks.subjects.find(s => s.code === "MATH");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering all", () => {
    const result = Filter.filterSubjects(Mocks.subjects, ["MATH", "ELA"]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.subjects);
  });

  it("filtering none", () => {
    const result = Filter.filterSubjects(Mocks.subjects);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.subjects);
  });

  it("filtering empty", () => {
    const result = Filter.filterSubjects(Mocks.subjects, [""]);
    expect(result).toHaveLength(0);
  });
  it("filtering bad subject", () => {
    const result = Filter.filterSubjects(Mocks.subjects, ["nosubject"]);
    expect(result).toHaveLength(0);
  });
});

describe("Filter.filterClaims", () => {
  it("filtering some", () => {
    const result = Filter.filterClaims(Mocks.claims, ["MATH1"]);
    const expected = Mocks.claims.find(c => c.code === "MATH1");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering some other", () => {
    const result = Filter.filterClaims(Mocks.claims, ["ELA1"]);
    const expected = Mocks.claims.find(c => c.code === "ELA1");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering some all", () => {
    const result = Filter.filterClaims(Mocks.claims, ["MATH1", "ELA1"]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.claims);
  });

  it("filtering none", () => {
    const result = Filter.filterClaims(Mocks.claims);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.claims);
  });

  it("filtering empty", () => {
    const result = Filter.filterClaims(Mocks.claims, [""]);
    expect(result).toHaveLength(0);
  });

  it("filtering bad claim", () => {
    const result = Filter.filterClaims(Mocks.claims, ["noclaim"]);
    expect(result).toHaveLength(0);
  });

  it("filtering empty claims", () => {
    const result = Filter.filterClaims([]);
    expect(result).toHaveLength(0);
  });

  it("filtering empty list", () => {
    const result = Filter.filterClaims(Mocks.claims, []);
    expect(result).toHaveLength(2);
  });
});

describe("Filter.filterTargets", () => {
  it("filtering some", () => {
    const result = Filter.filterTargets(Mocks.targets, [11]);
    const expected = Mocks.targets.find(s => s.nameHash === 11);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering some other", () => {
    const result = Filter.filterTargets(Mocks.targets, [12]);
    const expected = Mocks.targets.find(s => s.nameHash === 12);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering all", () => {
    const result = Filter.filterTargets(Mocks.targets, [12, 11, 21]);
    expect(result).toHaveLength(3);
    expect(result).toEqual(Mocks.targets);
  });

  it("filtering none", () => {
    const result = Filter.filterTargets(Mocks.targets);
    expect(result).toHaveLength(3);
    expect(result).toEqual(Mocks.targets);
  });

  it("filtering empty", () => {
    const result = Filter.filterTargets(Mocks.targets, []);
    expect(result).toHaveLength(3);
  });

  it("filtering bad target", () => {
    const result = Filter.filterTargets(Mocks.targets, [12121]);
    expect(result).toHaveLength(0);
  });
});
describe("Filter.filterInteractionTypes", () => {
  it("filtering some", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes, [
      "ITM1"
    ]);
    const expected = Mocks.interactionTypes.find(s => s.code === "ITM1");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering some other", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes, [
      "ITE1"
    ]);
    const expected = Mocks.interactionTypes.find(s => s.code === "ITE1");
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("filtering all", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes, [
      "ITE1",
      "ITM1"
    ]);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.interactionTypes);
  });

  it("filtering none", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes);
    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.interactionTypes);
  });

  it("filtering empty", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes, [""]);
    expect(result).toHaveLength(0);
  });

  it("filtering empty list", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes, []);
    expect(result).toHaveLength(2);
  });

  it("filtering bad interaction type", () => {
    const result = Filter.filterInteractionTypes(Mocks.interactionTypes, [
      "nointeraction"
    ]);
    expect(result).toHaveLength(0);
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
    const filteredSubjects = [subject];
    const result = Filter.getCurrentClaimsFilter(
      Mocks.searchModel,
      {},
      filteredSubjects
    );

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("one, search", () => {
    const subject = Mocks.subjects.find(s => s.code === "MATH");
    const expected = Mocks.claims.find(c => c.code === "MATH1");
    const result = Filter.getCurrentClaimsFilter(Mocks.searchModel, {
      subjects: ["MATH"]
    });
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("one, search bad", () => {
    const result = Filter.getCurrentClaimsFilter(Mocks.searchModel, {
      subjects: ["badsubject"]
    });
    expect(result).toBeUndefined();
  });

  it("all subjects", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentClaimsFilter(
      Mocks.searchModel,
      {},
      filteredSubjects
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.claims);
  });

  it("all subjects", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentClaimsFilter(Mocks.searchModel, {
      subjects: filteredSubjects.map(s => s.code)
    });

    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.claims);
  });

  it("no subjects", () => {
    const filteredSubjects = [];
    const result = Filter.getCurrentClaimsFilter(
      Mocks.searchModel,
      {},
      filteredSubjects
    );

    expect(result).toBeUndefined();
  });

  it("subjects no selections", () => {
    const filteredSubjects = [];
    const result = Filter.getCurrentClaimsFilter(Mocks.searchModel, {});

    expect(result).toHaveLength(2);
  });

  it("no search model", () => {
    const filteredSubjects = [];
    const result = Filter.getCurrentClaimsFilter(
      { claims: [], interactionTypes: [], subjects: [], targets: [] },
      {},
      filteredSubjects
    );

    expect(result).toBeUndefined();
  });
});

describe("Filter.getCurrentInteractionTypes", () => {
  it("one subject", () => {
    const subject = Mocks.subjects.find(s => s.code === "MATH");
    const expected = Mocks.interactionTypes.find(c => c.code === "ITM1");
    const filteredSubjects = [subject];
    const result = Filter.getCurrentInteractionTypes(
      Mocks.searchModel,
      {},
      filteredSubjects
    );

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("one, search", () => {
    const expected = Mocks.interactionTypes.find(c => c.code === "ITM1");
    const result = Filter.getCurrentInteractionTypes(Mocks.searchModel, {
      subjects: ["MATH"]
    });
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("one, search bad", () => {
    const result = Filter.getCurrentInteractionTypes(Mocks.searchModel, {
      subjects: ["badsubject"]
    });
    expect(result).toBeUndefined();
  });

  it("all subjects", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentInteractionTypes(
      Mocks.searchModel,
      {},
      filteredSubjects
    );

    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.interactionTypes);
  });

  it("all subjects", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentInteractionTypes(Mocks.searchModel, {
      subjects: filteredSubjects.map(s => s.code)
    });

    expect(result).toHaveLength(2);
    expect(result).toEqual(Mocks.interactionTypes);
  });

  it("no subjects", () => {
    const filteredSubjects = [];
    const result = Filter.getCurrentInteractionTypes(
      Mocks.searchModel,
      {},
      filteredSubjects
    );

    expect(result).toBeUndefined();
  });

  it("subjects no selections", () => {
    const filteredSubjects = [];
    const result = Filter.getCurrentInteractionTypes(Mocks.searchModel, {});

    expect(result).toHaveLength(2);
  });

  it("no search model", () => {
    const filteredSubjects = [];
    const result = Filter.getCurrentInteractionTypes(
      { claims: [], interactionTypes: [], subjects: [], targets: [] },
      {},
      filteredSubjects
    );

    expect(result).toBeUndefined();
  });
});
describe("Filter.getCurrentTargets", () => {
  it("one claim", () => {
    const claim = Mocks.claims.find(c => c.code === "ELA1");
    const expected = Mocks.targets.find(c => c.name === "ELA1");
    const result = Filter.getCurrentTargets(Mocks.searchModel, {}, [claim]);

    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("one, search", () => {
    const expected = Mocks.targets.find(c => c.name === "ELA1");
    const result = Filter.getCurrentTargets(Mocks.searchModel, {
      claims: ["ELA1"],
      subjects: ["ELA"]
    });
    expect(result).toHaveLength(1);
    expect(result).toContainEqual(expected);
  });

  it("one, search bad", () => {
    const result = Filter.getCurrentTargets(Mocks.searchModel, {
      claims: ["badclaim"],
      subjects: ["badsubject"]
    });
    expect(result).toBeUndefined();
  });

  it("all claims", () => {
    const result = Filter.getCurrentTargets(
      Mocks.searchModel,
      {},
      Mocks.claims
    );

    expect(result).toHaveLength(3);
    expect(result).toEqual(Mocks.targets);
  });

  it("all subjects and claims", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentTargets(Mocks.searchModel, {
      subjects: filteredSubjects.map(s => s.code),
      claims: Mocks.claims.map(c => c.code)
    });

    expect(result).toHaveLength(3);
    expect(result).toEqual(Mocks.targets);
  });

  it("all subjects and no claims", () => {
    const filteredSubjects = Mocks.subjects;
    const result = Filter.getCurrentTargets(Mocks.searchModel, {
      subjects: filteredSubjects.map(s => s.code),
      claims: []
    });

    expect(result).toHaveLength(3);
    expect(result).toEqual(Mocks.targets);
  });

  it("no claims", () => {
    const result = Filter.getCurrentTargets(Mocks.searchModel, {}, []);

    expect(result).toBeUndefined();
  });

  it("no search model", () => {
    const result = Filter.getCurrentTargets(
      { claims: [], interactionTypes: [], subjects: [], targets: [] },
      {},
      []
    );

    expect(result).toBeUndefined();
  });
});
describe("Filter.getUpdatedSearchFilters", () => {});
