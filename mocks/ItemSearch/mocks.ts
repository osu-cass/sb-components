import { ItemCardModel } from "@src/ItemCard/ItemCardModels";
import {
  SearchFilterStringTypes,
  TargetModel,
  SearchAPIParamsModel,
  ItemsSearchModel,
  FilterCategoryModel,
  FilterOptionModel,
  FilterType,
  GradeLevels,
  GradeLevel
} from "@src/index";

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
  { description: "test", id: "A" },
  { description: "test2", id: "B" },
  { description: "test3", id: "C" }
];

export const resultSearchOptionFilterTarget: FilterOptionModel[] = [
  { label: "A", key: "A", isSelected: false, filterType: FilterType.Target },
  {
    label: "B",
    key: "B",
    isSelected: false,
    filterType: FilterType.Target
  },
  { label: "C", key: "C", isSelected: false, filterType: FilterType.Target }
];

export const resultSearchOptionFilterTargetSelectedSingle: FilterOptionModel[] = [
  { label: "A", key: "A", isSelected: true, filterType: FilterType.Target },
  {
    label: "B",
    key: "B",
    isSelected: false,
    filterType: FilterType.Target
  },
  { label: "C", key: "C", isSelected: false, filterType: FilterType.Target }
];

export const resultSearchOptionFilterTargetSelectedMultiple: FilterOptionModel[] = [
  { label: "A", key: "A", isSelected: true, filterType: FilterType.Target },
  {
    label: "B",
    key: "B",
    isSelected: false,
    filterType: FilterType.Target
  },
  { label: "C", key: "C", isSelected: true, filterType: FilterType.Target }
];

export const mockSeachAPI: SearchAPIParamsModel = {
  itemId: "item1",
  // tslint:disable-next-line:no-bitwise
  gradeLevels: GradeLevels.Grade3 | GradeLevels.Grade4,
  subjects: ["t1", "t2"],
  claims: ["t1", "t2"],
  interactionTypes: ["t1", "t2"],
  performanceOnly: true,
  catOnly: true,
  targets: ["A", "B"]
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
  { description: "test", id: "A" },
  { description: "test2", id: "B" },
  { description: "test3", id: "C" }
];

export const resultFilterOptionModeltarget: FilterOptionModel[] = [
  {
    filterType: FilterType.Target,
    isSelected: true,
    key: "A",
    label: "A"
  },
  {
    filterType: FilterType.Target,
    isSelected: true,
    key: "B",
    label: "B"
  },
  {
    filterType: FilterType.Target,
    isSelected: false,
    key: "C",
    label: "C"
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
      targetCodes: ["A", "B", "C", "D"]
    },
    {
      label: "Math 2",
      code: "MATH2",
      targetCodes: ["A", "B", "E"]
    },
    {
      label: "Math 3",
      code: "MATH3",
      targetCodes: ["A", "B", "C", "D"]
    },
    {
      label: "English 1",
      code: "ELA1",
      targetCodes: ["A", "B", "E"]
    },
    {
      label: "English 2",
      code: "ELA2",
      targetCodes: ["C", "D"]
    }
  ]
};
