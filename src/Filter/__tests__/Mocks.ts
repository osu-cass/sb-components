import { GradeLevel, GradeLevels } from "../../GradeLevels/GradeLevels";
import {
  FilterOptionModel,
  FilterCategoryModel,
  FilterType
} from "../FilterModels";
import {
  SubjectModel,
  TargetModel,
  ClaimModel,
  ItemsSearchModel,
  SearchAPIParamsModel
} from "../../ItemSearch/ItemSearchModels";
import { Filter } from "../Filter";
import { InteractionTypeModel } from "../../AboutTestItems/AboutTestItemsModels";

export const subjectSelectedOptions: FilterOptionModel[] = [
  { label: "ELA", key: "ELA", isSelected: false, filterType: FilterType.Grade },
  { label: "Math", key: "Math", isSelected: true, filterType: FilterType.Grade }
];

export const subjectSelectedCategory: FilterCategoryModel = {
  disabled: false,
  label: "Subject",
  code: FilterType.Subject,
  filterOptions: subjectSelectedOptions
};

export const claimSelectedOptions: FilterOptionModel[] = [
  {
    label: "Claim1",
    key: "Math1",
    isSelected: true,
    filterType: FilterType.Claim
  },
  {
    label: "Claim2",
    key: "Math2",
    isSelected: true,
    filterType: FilterType.Claim
  }
];

export const claimOptions = claimSelectedOptions.map(c => {
  return { ...c, isSelected: false };
});

export const claimSelectedCategory: FilterCategoryModel = {
  disabled: false,
  label: "Claim",
  code: FilterType.Claim,
  filterOptions: claimSelectedOptions
};

export const claimCategory = {
  ...claimSelectedCategory,
  filterOptions: claimOptions
};

export const claimEmptyCategory = {
  ...claimSelectedCategory,
  filterOptions: []
};

export const gradeSelectedOptions: FilterOptionModel[] = [
  {
    label: "Middle",
    key: GradeLevels.Middle.toString(),
    isSelected: true,
    filterType: FilterType.Grade
  },
  {
    label: "Elementary",
    key: GradeLevels.Elementary.toString(),
    isSelected: true,
    filterType: FilterType.Grade
  },

  {
    label: "Grade11",
    key: GradeLevels.Grade11.toString(),
    isSelected: false,
    filterType: FilterType.Grade
  }
];

export const gradeSelectedCategory: FilterCategoryModel = {
  disabled: false,
  label: "Grade",
  code: FilterType.Grade,
  filterOptions: gradeSelectedOptions
};

export const gradeOptions = gradeSelectedOptions.map(g => {
  return { ...g, isSelected: false };
});

export const gradeCategory = {
  ...gradeSelectedCategory,
  filterOptions: gradeOptions
};

export const gradeEmptyCategory = {
  ...gradeSelectedCategory,
  filterOptions: gradeOptions
};

export const performanceCatOptions: FilterOptionModel[] = [
  {
    label: "Performance",
    key: FilterType.Performance,
    isSelected: false,
    filterType: FilterType.Performance
  },
  {
    label: "CAT",
    key: FilterType.CAT,
    isSelected: true,
    filterType: FilterType.CAT
  }
];

export const performanceTruthOptions: FilterOptionModel[] = [
  { ...performanceCatOptions[0], isSelected: true }
];
export const performanceFalseCategory: FilterCategoryModel = {
  disabled: false,
  label: "Performance",
  code: FilterType.TechnologyType,
  filterOptions: performanceCatOptions
};

export const performanceTruthCategory: FilterCategoryModel = {
  ...performanceFalseCategory,
  filterOptions: performanceTruthOptions
};

export const performanceEmptyCategory: FilterCategoryModel = {
  ...performanceFalseCategory,
  filterOptions: []
};

export const targetOptions: FilterOptionModel[] = [
  {
    label: "1",
    key: "133",
    isSelected: true,
    filterType: FilterType.Target
  },
  {
    label: "a2",
    key: "212",
    isSelected: false,
    filterType: FilterType.Target
  }
];

export const targetSelectionsCategory: FilterCategoryModel = {
  disabled: false,
  label: "Target",
  code: FilterType.Target,
  filterOptions: targetOptions
};

export const targetCategory: FilterCategoryModel = {
  ...targetSelectionsCategory,
  filterOptions: targetOptions.map(t => {
    return { ...t, isSelected: false };
  })
};

export const targetEmptyCategory: FilterCategoryModel = {
  ...targetSelectionsCategory,
  filterOptions: []
};
//Item Search Models

export const subjects: SubjectModel[] = [
  {
    claimCodes: ["MATH1", "MATH2"],
    interactionTypeCodes: ["ITM1", "ITM2"],
    code: "MATH",
    label: "MATH"
  },
  {
    claimCodes: ["ELA1", "ELA2"],
    interactionTypeCodes: ["ITE1", "ITE2"],
    code: "ELA",
    label: "ELA"
  }
];

export const claims: ClaimModel[] = [
  {
    targetCodes: [11, 12, 13, 14],
    code: "MATH1",
    label: "MATH1"
  },
  {
    targetCodes: [21, 22, 23, 24],
    code: "ELA1",
    label: "ELA1"
  }
];

export const targets: TargetModel[] = [
  {
    name: "ELA1",
    nameHash: 21
  },
  {
    name: "MATH1",
    nameHash: 11
  },
  {
    name: "MATH2",
    nameHash: 12
  }
];

export const interactionTypes: InteractionTypeModel[] = [
  {
    code: "ITM1",
    label: "MATH1"
  },
  {
    code: "ITE1",
    label: "ELA1"
  }
];

export const searchModel: ItemsSearchModel = {
  interactionTypes: interactionTypes,
  claims: claims,
  subjects: subjects,
  targets: targets
};
