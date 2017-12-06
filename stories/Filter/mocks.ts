import {
  AdvancedFilterProps,
  FilterOptionModel,
  OptionTypeModel,
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  ItemsSearchModel,
  InteractionTypeModel,
  SubjectModel,
  ClaimModel,
  TargetModel
} from "../../src";
import { action } from "@storybook/addon-actions";
import { FilterType } from "../../src/Filter/AdvancedFilterModel";

export const gradeFilterOptions: FilterOptionModel[] = [
  {
    label: "Grades 3-5",
    key: "7",
    isSelected: false,
    filterType: FilterType.Grade
  },
  {
    label: "Grades 6-8",
    key: "56",
    isSelected: false,
    filterType: FilterType.Grade
  },
  {
    label: "High School",
    key: "960",
    isSelected: false,
    filterType: FilterType.Grade
  }
];

export const subjectsFilterOptions: FilterOptionModel[] = [
  {
    label: "English Literacy/ Arts",
    key: "ELA",
    isSelected: false,
    filterType: FilterType.Subject
  },
  {
    label: "Mathematics",
    key: "Math",
    isSelected: false,
    filterType: FilterType.Subject
  }
];

export const subjectsFilterOptionsSelected: FilterOptionModel[] = [
  {
    label: "English Literacy & Arts",
    key: "ELA",
    isSelected: true,
    filterType: FilterType.Subject
  },
  {
    label: "Maths",
    key: "Math",
    isSelected: true,
    filterType: FilterType.Subject
  }
];

export const advancedFilterSubject: AdvancedFilterCategoryModel = {
  disabled: false,
  isMultiSelect: false,
  label: "Subjects",
  code: FilterType.Subject,
  filterOptions: [
    {
      label: "English Literacy/ Arts",
      key: "ELA",
      isSelected: false,
      filterType: FilterType.Subject
    },
    {
      label: "Mathematics",
      key: "Math",
      isSelected: false,
      filterType: FilterType.Subject
    }
  ],
  displayAllButton: false,
  helpText: "Subject Help"
};

export const advancedFilterSubjectMulti: AdvancedFilterCategoryModel = {
  ...advancedFilterSubject,
  filterOptions: [
    {
      label: "English Literacy & Arts",
      key: "EL&A",
      isSelected: false,
      filterType: FilterType.Subject
    },
    {
      label: "Maths",
      key: "Mth",
      isSelected: false,
      filterType: FilterType.Subject
    }
  ],
  label: "Multi",
  isMultiSelect: true
};

export const advancedFilterSubjectDisabled: AdvancedFilterCategoryModel = {
  ...advancedFilterSubject,
  filterOptions: [
    {
      label: "English",
      key: "Eng",
      isSelected: false,
      filterType: FilterType.Subject
    },
    {
      label: "Chemistry",
      key: "Chem",
      isSelected: false,
      filterType: FilterType.Subject
    }
  ],
  label: "Disabled",
  disabled: true
};

export const advancedFilterSubjectDisabledMulti: AdvancedFilterCategoryModel = {
  ...advancedFilterSubject,
  filterOptions: [
    {
      label: "Reading",
      key: "Read",
      isSelected: false,
      filterType: FilterType.Subject
    },
    {
      label: "History",
      key: "Hist",
      isSelected: false,
      filterType: FilterType.Subject
    }
  ],
  label: "Disabled Multi",
  disabled: true,
  isMultiSelect: true
};

export const advancedFilterSubjectMultiAll: AdvancedFilterCategoryModel = {
  ...advancedFilterSubject,
  filterOptions: [
    {
      label: "US History",
      key: "USh",
      isSelected: false,
      filterType: FilterType.Subject
    },
    {
      label: "World History",
      key: "Wh",
      isSelected: false,
      filterType: FilterType.Subject
    }
  ],
  label: "Multi All",
  displayAllButton: true,
  isMultiSelect: true
};

export const advancedFilterSubjectMultiAllDisabled: AdvancedFilterCategoryModel = {
  ...advancedFilterSubject,
  filterOptions: [
    {
      label: "Calculus",
      key: "Calc",
      isSelected: false,
      filterType: FilterType.Subject
    },
    {
      label: "Geometry",
      key: "Geom",
      isSelected: false,
      filterType: FilterType.Subject
    }
  ],
  label: "Multi All Disabled",
  displayAllButton: true,
  isMultiSelect: true
};

export const advancedFilterGrade: AdvancedFilterCategoryModel = {
  disabled: false,
  isMultiSelect: false,
  label: "Grade",
  filterOptions: gradeFilterOptions,
  displayAllButton: true,
  helpText: "Grade Help",
  code: FilterType.Grade
};

export const mockAdvancedFilterCategoriesAll: AdvancedFilterCategoryModel[] = [
  advancedFilterGrade,
  advancedFilterSubjectMulti,
  advancedFilterSubjectDisabled,
  advancedFilterSubjectDisabledMulti,
  advancedFilterSubjectMultiAll,
  advancedFilterSubjectMultiAllDisabled
];

export const mockAdvancedFilterCategoriesSelected: AdvancedFilterCategoryModel[] = [
  {
    disabled: false,
    isMultiSelect: false,
    label: "Grade",
    filterOptions: subjectsFilterOptionsSelected,
    displayAllButton: true,
    helpText: "Grade Help",
    code: FilterType.Grade
  }
];

export const mockBasicFilterCategories: BasicFilterCategoryModel[] = [
  {
    disabled: false,
    label: "Grade",
    code: FilterType.Grade,
    filterOptions: gradeFilterOptions,
    type: OptionTypeModel.DropDown
  },
  {
    disabled: false,
    label: "Subjects",
    code: FilterType.Subject,
    filterOptions: [
      {
        label: "English Literacy/ Arts",
        key: "ELA",
        isSelected: false,
        filterType: FilterType.Subject
      },
      {
        label: "Mathematics",
        key: "Math",
        isSelected: false,
        filterType: FilterType.Subject
      }
    ],
    type: OptionTypeModel.radioBtn
  }
];

export const selectedHandler = action("clicked filter");

export const mockInteractionTypes: InteractionTypeModel[] = [
  {
    code: "EBSR",
    label: "Evidence-Based Selected Response",
    description:
      "<p>This item presents students with a two-part question, parts A and B. \n              Students select a correct response from four options in Part A and then identify textual support for that response in Part B.</p>",
    order: 1
  },
  {
    code: "EQ",
    label: "Equation",
    description:
      "<p>The Equation item type has one or more text boxes for a response area and a key pad containing mathematical characters. \n              The student enters an equation or numerical answer into the text box using the key pad or keyboard.</p>",
    order: 2
  },
  {
    code: "GI1",
    label: "Grid Item: Drag and Drop",
    description:
      "<p>There are three types of Grid Items. This is an example of a Drag and Drop Grid Item. \n              This item type requires students to click on a single element or multiple elements and drag-and-drop the element(s) into a background image.</p>",
    order: 4
  },
  {
    code: "GI",
    label: "Grid Item",
    description:
      "<p>Smarter Balanced uses three variations of the Grid Item type, each with a distinct\n              appearance and interaction mode.</p>\n              \n\t\t\t  <ul>\n              <li><b>Graphing variant</b> consists of a grid in which students plot\n              points and/or lines. The available tools include a select, delete, add point, and connect line.\n              Depending on the item, the point or line tool may not appear. A text box below the grid offers\n              hints on what the student can do with each tool. The response area may have a background image on which the student plots points or lines\n              as in this example. Grid Item – Graphing Variants may constrain points and lines; for example they may be\n              constrained to a number line. The background, whether a simple grid, a graph with axes, or\n              another image is simply a bitmap.</li>\n              \n              <li><b>Hot Spot variant</b> consists of a space in which images are\n              displayed. Clicking on certain hot spot areas causes images appear or disappear.\n              Transparent sections of the images allow the background to show through.</li>\n              \n              <li><b>Drag and Drop variant</b> has a workspace with a background image. Other\n              images can be dragged and dropped into the workspace. The drop locations may or may not\n              be constrained. When they are constrained, dropped images snap to nearby locaitons.</li>\n\t\t\t  </ul>",
    order: 4
  }
];

export const mockSubjectModel: SubjectModel[] = [
  {
    code: "MATH",
    label: "Mathematics",
    claimCodes: ["MATH1", "MATH2", "MATH3"],
    interactionTypeCodes: ["EQ", "GI", "MC", "MI", "MS", "TI", "SA"]
  },
  {
    code: "ELA",
    label: "English language arts/literacy",
    claimCodes: ["ELA1", "ELA2", "ELA3"],
    interactionTypeCodes: ["EBSR", "SA", "HTQ", "MC", "MS", "MI", "WER"]
  }
];

export const mockClaimModel: ClaimModel[] = [
  {
    code: "MATH1",
    label: "Concepts and Procedures",
    targetCodes: []
  },
  {
    code: "MATH2",
    label: "Problem Solving",
    targetCodes: []
  },
  {
    code: "ELA1",
    label: "Reading",
    targetCodes: [1262, 1839, 2081, 2939, 2455, 2478, 1137, 1039, 1231, 2455]
  },
  {
    code: "ELA2",
    label: "Writing",
    targetCodes: [2312, 1052, 1729, 1617, 2287, 1183]
  }
];

export const mockTargetModel: TargetModel[] = [
  { name: "Word Meanings", nameHash: 1262 },
  { name: "Reasoning & Evidence", nameHash: 1839 },
  { name: "Reasoning & Evaluation", nameHash: 2084 },
  { name: "Analysis Within Or Across Texts", nameHash: 2939 },
  { name: "Text Structures & Features", nameHash: 247 }
];

export const mockItemsSearchModel: ItemsSearchModel = {
  interactionTypes: mockInteractionTypes,
  subjects: mockSubjectModel,
  claims: mockClaimModel,
  targets: mockTargetModel
};

export const emptyAdvancedFilterClaims: AdvancedFilterCategoryModel = {
  disabled: false,
  isMultiSelect: true,
  label: "Claims",
  code: FilterType.Claim,
  displayAllButton: true,
  filterOptions: [],
  helpText: "Claims help text here."
};

export const allClaimsFilterOptions: FilterOptionModel[] = [
  { label: "Reading", key: "ELA1", isSelected: false },
  { label: "Writing", key: "ELA2", isSelected: false },
  { label: "Listening", key: "ELA3", isSelected: false },
  { label: "Concepts and Procedures", key: "MATH1", isSelected: false },
  { label: "Problem Solving", key: "MATH2", isSelected: false },
  { label: "Communicating Reasoning", key: "MATH3", isSelected: false }
];

export const FilledAdvancedFilterClaims: AdvancedFilterCategoryModel = {
  disabled: false,
  isMultiSelect: true,
  label: "Claims",
  code: FilterType.Claim,
  displayAllButton: true,
  filterOptions: allClaimsFilterOptions,
  helpText: "Claims help text here."
};

export const emptyAdvancedFilterInteractionTypes: AdvancedFilterCategoryModel = {
  disabled: false,
  isMultiSelect: true,
  label: "interaction type",
  code: FilterType.InteractionType,
  displayAllButton: true,
  filterOptions: [],
  helpText: "InteractionTypes help text here."
};
export const emptyAdvancedFilterTargets: AdvancedFilterCategoryModel = {
  disabled: false,
  isMultiSelect: true,
  label: "Targets",
  code: FilterType.Target,
  displayAllButton: true,
  filterOptions: [],
  helpText: "Targets help text here."
};
