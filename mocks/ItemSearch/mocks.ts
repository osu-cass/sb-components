import { ItemCardModel } from "src/ItemCard/ItemCardModels";
import {
  SearchFilterStringTypes,
  TargetModel,
  SearchAPIParamsModel
} from "src/ItemSearch/ItemSearchModels";
import { FilterOptionModel, FilterType } from "src/Filter/FilterModels";
import { GradeLevels, GradeLevel } from "src/GradeLevels/GradeLevels";
import { ItemsSearchModel } from "../../src/ItemSearch/ItemSearchModels";
import { FilterCategoryModel } from "lib/Filter/FilterModels";

export const itemCards: ItemCardModel[] = [
  {
    bankKey: 187,
    itemKey: 3206,
    title: "Math Grade 6 Claim 1",
    grade: 8,
    gradeLabel: "Grade 6",
    subjectCode: "MATH",
    subjectLabel: "Math",
    claimCode: "MATH1",
    claimLabel: "Concepts and Procedures",
    targetHash: 100,
    targetId: "A",
    targetDescription: "Target A description",
    targetShortName: "",
    interactionTypeCode: "EQ",
    interactionTypeLabel: "Equation",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    calculator: true
  },
  {
    bankKey: 187,
    itemKey: 3163,
    title: "ELA/ literacy Grade 3 Claim 1",
    grade: 1,
    gradeLabel: "Grade 3",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    claimCode: "ELA1",
    claimLabel: "Reading",
    targetHash: 1039,
    targetId: "B",
    targetDescription: "Target B description",
    targetShortName: "Key Details",
    interactionTypeCode: "MC",
    interactionTypeLabel: "Multiple Choice",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    calculator: false
  },
  {
    bankKey: 187,
    itemKey: 3615,
    title: "Math Grade 6 Claim 4",
    grade: 8,
    gradeLabel: "Grade 6",
    subjectCode: "MATH",
    subjectLabel: "Math",
    claimCode: "MATH4",
    claimLabel: "Modeling/Data Analysis",
    targetHash: 0,
    targetId: "C",
    targetDescription: "target C description",
    targetShortName: "",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false
  },
  {
    bankKey: 187,
    itemKey: 2928,
    title: "ELA/ literacy Grade 4 Claim 4",
    grade: 2,
    gradeLabel: "Grade 4",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    claimCode: "ELA4",
    claimLabel: "Research/Inquiry",
    targetHash: 2832,
    targetId: "D",
    targetDescription: "target D description",
    targetShortName: "Evaluate Information/ sources",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false
  }
];

export const genericSearchStringTypes: SearchFilterStringTypes[] = [
  { label: "test", code: "t1" },
  { label: "test2", code: "t2" },
  { label: "test3", code: "t3" }
];

export const resultFilterOptionModel: FilterOptionModel[] = [
  {
    filterType: FilterType.Subject,
    isSelected: false,
    key: "t1",
    label: "test"
  },
  {
    filterType: FilterType.Subject,
    isSelected: false,
    key: "t2",
    label: "test2"
  },
  {
    filterType: FilterType.Subject,
    isSelected: false,
    key: "t3",
    label: "test3"
  }
];

export const resultFilterOptionModelSelected: FilterOptionModel[] = [
  {
    filterType: FilterType.Subject,
    isSelected: true,
    key: "t1",
    label: "test"
  },
  {
    filterType: FilterType.Subject,
    isSelected: false,
    key: "t2",
    label: "test2"
  },
  {
    filterType: FilterType.Subject,
    isSelected: true,
    key: "t3",
    label: "test3"
  }
];

export const resultFilterGradeModel: FilterOptionModel[] = [
  {
    filterType: FilterType.Grade,
    isSelected: false,
    key: "1",
    label: "Grade 3"
  },
  {
    filterType: FilterType.Grade,
    isSelected: false,
    key: "2",
    label: "Grade 4"
  }
];

export const resultFilterGradeModelSelectedSingle: FilterOptionModel[] = [
  {
    filterType: FilterType.Grade,
    isSelected: true,
    key: "1",
    label: "Grade 3"
  },
  {
    filterType: FilterType.Grade,
    isSelected: false,
    key: "2",
    label: "Grade 4"
  }
];

export const resultFilterGradeModelSelectedMultiple: FilterOptionModel[] = [
  {
    filterType: FilterType.Grade,
    isSelected: true,
    key: "1",
    label: "Grade 3"
  },
  {
    filterType: FilterType.Grade,
    isSelected: true,
    key: "2",
    label: "Grade 4"
  }
];

export const searchOptionFilterTarget: TargetModel[] = [
  { name: "test", nameHash: 1 },
  { name: "test2", nameHash: 2 },
  { name: "test3", nameHash: 3 }
];

export const resultSearchOptionFilterTarget: FilterOptionModel[] = [
  { label: "test", key: "1", isSelected: false, filterType: FilterType.Target },
  {
    label: "test2",
    key: "2",
    isSelected: false,
    filterType: FilterType.Target
  },
  { label: "test3", key: "3", isSelected: false, filterType: FilterType.Target }
];

export const resultSearchOptionFilterTargetSelectedSingle: FilterOptionModel[] = [
  { label: "test", key: "1", isSelected: true, filterType: FilterType.Target },
  {
    label: "test2",
    key: "2",
    isSelected: false,
    filterType: FilterType.Target
  },
  { label: "test3", key: "3", isSelected: false, filterType: FilterType.Target }
];

export const resultSearchOptionFilterTargetSelectedMultiple: FilterOptionModel[] = [
  { label: "test", key: "1", isSelected: true, filterType: FilterType.Target },
  {
    label: "test2",
    key: "2",
    isSelected: false,
    filterType: FilterType.Target
  },
  { label: "test3", key: "3", isSelected: true, filterType: FilterType.Target }
];

export const mockSeachAPI: SearchAPIParamsModel = {
  itemId: "item1",
  gradeLevels: GradeLevels.Grade3 | GradeLevels.Grade4,
  subjects: ["t1", "t2"],
  claims: ["t1", "t2"],
  interactionTypes: ["t1", "t2"],
  performanceOnly: true,
  catOnly: true,
  targets: [1, 2]
};

export const resultFilterOptionModelClaim: FilterOptionModel[] = [
  {
    filterType: FilterType.Claim,
    isSelected: true,
    key: "t1",
    label: "test"
  },
  {
    filterType: FilterType.Claim,
    isSelected: true,
    key: "t2",
    label: "test2"
  },
  {
    filterType: FilterType.Claim,
    isSelected: false,
    key: "t3",
    label: "test3"
  }
];

export const resultFilterOptionModelIT: FilterOptionModel[] = [
  {
    filterType: FilterType.InteractionType,
    isSelected: true,
    key: "t1",
    label: "test"
  },
  {
    filterType: FilterType.InteractionType,
    isSelected: true,
    key: "t2",
    label: "test2"
  },
  {
    filterType: FilterType.InteractionType,
    isSelected: false,
    key: "t3",
    label: "test3"
  }
];

export const resultFilterOptionModelSubject: FilterOptionModel[] = [
  {
    filterType: FilterType.Subject,
    isSelected: true,
    key: "t1",
    label: "test"
  },
  {
    filterType: FilterType.Subject,
    isSelected: true,
    key: "t2",
    label: "test2"
  },
  {
    filterType: FilterType.Subject,
    isSelected: false,
    key: "t3",
    label: "test3"
  }
];

export const gradeSearchStringTypes: GradeLevels[] = [
  GradeLevels.Grade3,
  GradeLevels.Grade4,
  GradeLevels.Grade5
];

export const resultFilterOptionModelGrade: FilterOptionModel[] = [
  {
    filterType: FilterType.Grade,
    isSelected: true,
    key: "1",
    label: "Grade 3"
  },
  {
    filterType: FilterType.Grade,
    isSelected: true,
    key: "2",
    label: "Grade 4"
  },
  {
    filterType: FilterType.Grade,
    isSelected: false,
    key: "4",
    label: "Grade 5"
  }
];

export const targetSearchStringTypes: TargetModel[] = [
  { name: "test", nameHash: 1 },
  { name: "test2", nameHash: 2 },
  { name: "test3", nameHash: 3 }
];

export const resultFilterOptionModeltarget: FilterOptionModel[] = [
  {
    filterType: FilterType.Target,
    isSelected: true,
    key: "1",
    label: "test"
  },
  {
    filterType: FilterType.Target,
    isSelected: true,
    key: "2",
    label: "test2"
  },
  {
    filterType: FilterType.Target,
    isSelected: false,
    key: "3",
    label: "test3"
  }
];

export const techtypeSearchStringTypes: SearchFilterStringTypes[] = [
  { label: "test", code: "CAT" },
  { label: "test2", code: "Performance" },
  { label: "test3", code: "t3" }
];

export const resultFilterOptionModelTechType: FilterOptionModel[] = [
  {
    filterType: FilterType.TechnologyType,
    isSelected: true,
    key: "CAT",
    label: "test"
  },
  {
    filterType: FilterType.TechnologyType,
    isSelected: true,
    key: "Performance",
    label: "test2"
  },
  {
    filterType: FilterType.TechnologyType,
    isSelected: false,
    key: "t3",
    label: "test3"
  }
];

export const itemSearchModel: ItemsSearchModel = {
  subjects: [
    {
      label: "Mathematics",
      code: "MATH",
      claimCodes: ["MATH1", "MATH2"],
      interactionTypeCodes: ["IT1", "IT2", "IT3"]
    },
    {
      label: "English",
      code: "ELA",
      claimCodes: ["ELA1", "ELA2"],
      interactionTypeCodes: ["IT3", "IT4", "IT5"]
    }
  ],
  claims: [
    {
      label: "Math 1",
      code: "MATH1",
      targetCodes: [1,2,3,4]
    },
    {
      label: "Math 2",
      code: "MATH2",
      targetCodes: [5,2,3,4]
    },
    {
      label: "Math 3",
      code: "MATH3",
      targetCodes: [6,2,3,4]
    },
    {
      label: "English 1",
      code: "ELA1",
      targetCodes: [5,6,7,8]
    },
    {
      label: "English 2",
      code: "ELA2",
      targetCodes: [8,9,10,11]
    }
  ]
};
