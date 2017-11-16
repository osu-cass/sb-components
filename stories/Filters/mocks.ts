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
  } from '../../src';
import { action } from '@storybook/addon-actions';

export const gradeFilterOptions: FilterOptionModel[] = [
  {label: "Grades 3-5", key: "7", isSelected: false},
  {label: "Grades 6-8", key: "56", isSelected: false},
  {label: "High School", key: "960", isSelected: false}
]

export const subjectsFilterOptions: FilterOptionModel[] = [
  {label: "English Literacy/ Arts", key: "ELA", isSelected: false},
  {label: "Mathematics", key: "Math", isSelected: false}

]

export const subjectsFilterOptionsSelected: FilterOptionModel[] = [
  {label: "English Literacy/ Arts", key: "ELA", isSelected: true},
  {label: "Mathematics", key: "Math", isSelected: true}

]


export const advancedFilterSubject: AdvancedFilterCategoryModel = {
  disabled: false, isMultiSelect: false, label: "Subjects", code: "Subject", 
  filterOptions:subjectsFilterOptions, displayAllButton: false, helpText: "Subject Help",
}

export const advancedFilterSubjectMulti : AdvancedFilterCategoryModel = {
  ...advancedFilterSubject, label: "Multi", isMultiSelect: true
}

export const advancedFilterSubjectDisabled : AdvancedFilterCategoryModel = {
  ...advancedFilterSubject, label: "Disabled", disabled: true
}

export const advancedFilterSubjectDisabledMulti : AdvancedFilterCategoryModel = {
  ...advancedFilterSubject, label:"Disabled Multi", disabled: true, isMultiSelect: true
}

export const advancedFilterSubjectMultiAll : AdvancedFilterCategoryModel = {
  ...advancedFilterSubject, label: "Multi All", displayAllButton: true, isMultiSelect: true
}

export const advancedFilterSubjectMultiAllDisabled : AdvancedFilterCategoryModel = {
  ...advancedFilterSubject, label: "Multi All Disabled", displayAllButton: true, isMultiSelect: true
}



export const advancedFilterGrade : AdvancedFilterCategoryModel = {
  disabled: false, isMultiSelect: false, label: "Grade", filterOptions: gradeFilterOptions, 
  displayAllButton: true, helpText: "Grade Help", code: "Grade"
}

export const mockAdvancedFilterCategoriesAll: AdvancedFilterCategoryModel[] = [
  advancedFilterGrade,
  advancedFilterSubjectMulti,
  advancedFilterSubjectDisabled,
  advancedFilterSubjectDisabledMulti,
  advancedFilterSubjectMultiAll,
  advancedFilterSubjectMultiAllDisabled
]


export const mockBasicFilterCategories: BasicFilterCategoryModel[] = [
  {disabled: false, label: "Grade", code: "Grade", filterOptions: gradeFilterOptions, type: OptionTypeModel.DropDown},
  {disabled: false, label: "Subjects", code: "Subject", filterOptions:subjectsFilterOptions, type:OptionTypeModel.radioBtn}
]

export const selectedHandler = action("clicked filter");


export const mockInteractionTypes:InteractionTypeModel[] = [
  {
    code: "EBSR",
    label: "Evidence-Based Selected Response",
    description: "<p>This item presents students with a two-part question, parts A and B. \n              Students select a correct response from four options in Part A and then identify textual support for that response in Part B.</p>",
    order: 1
  },
  {
    code: "EQ",
    label: "Equation",
    description: "<p>The Equation item type has one or more text boxes for a response area and a key pad containing mathematical characters. \n              The student enters an equation or numerical answer into the text box using the key pad or keyboard.</p>",
    order: 2
  },
  {
    code: "GI1",
    label: "Grid Item: Drag and Drop",
    description: "<p>There are three types of Grid Items. This is an example of a Drag and Drop Grid Item. \n              This item type requires students to click on a single element or multiple elements and drag-and-drop the element(s) into a background image.</p>",
    order: 4
  },
  {
    code: "GI",
    label: "Grid Item",
    description: "<p>Smarter Balanced uses three variations of the Grid Item type, each with a distinct\n              appearance and interaction mode.</p>\n              \n\t\t\t  <ul>\n              <li><b>Graphing variant</b> consists of a grid in which students plot\n              points and/or lines. The available tools include a select, delete, add point, and connect line.\n              Depending on the item, the point or line tool may not appear. A text box below the grid offers\n              hints on what the student can do with each tool. The response area may have a background image on which the student plots points or lines\n              as in this example. Grid Item – Graphing Variants may constrain points and lines; for example they may be\n              constrained to a number line. The background, whether a simple grid, a graph with axes, or\n              another image is simply a bitmap.</li>\n              \n              <li><b>Hot Spot variant</b> consists of a space in which images are\n              displayed. Clicking on certain hot spot areas causes images appear or disappear.\n              Transparent sections of the images allow the background to show through.</li>\n              \n              <li><b>Drag and Drop variant</b> has a workspace with a background image. Other\n              images can be dragged and dropped into the workspace. The drop locations may or may not\n              be constrained. When they are constrained, dropped images snap to nearby locaitons.</li>\n\t\t\t  </ul>",
    order: 4
  },
  {
    code: "GI2",
    label: "Grid Item: Hot Spot",
    description: "<p>This is an example of a Hot Spot Grid item. This item type requires students to click on certain areas of an image.</p>",
    order: 5
  },
  {
    code: "GI3",
    label: "Grid Item: Graphing",
    description: "<p>This is an example of a Graphing Grid Item. This item type requires students to plot points and/or draw lines.</p>",
    order: 6
  },
  {
    code: "HTQ",
    label: "Hot Text",
    description: "<p>The Hot Text item type includes words or phrases that students can either select (highlight) by clicking or rearrange by clicking and dragging.</p>",
    order: 8
  },
  {
    code: "MI",
    label: "Matching Item",
    description: "<p>The Matching item type requires students to match text or images in rows to values in columns. The student selects the boxes where a match is valid.</p>",
    order: 9
  },
  {
    code: "MC",
    label: "Multiple Choice",
    description: "<p>The Multiple Choice item type presents students with a number of answer options. The student may select only one option.</p>",
    order: 10
  },
  {
    code: "MS",
    label: "Multi Select",
    description: "<p>The Multi Select item type presents students with a number of answer options. The student may select one or more options. \n              For this example, two of the options will be selected.</p>",
    order: 11
  },
  {
    code: "SA",
    label: "Short Answer",
    description: "<p>The Short Answer item type has a text box for a response area and requires a keyboard entry of alphanumeric characters.</p>",
    order: 12
  },
  {
    code: "TI",
    label: "Table Item",
    description: "<p>The Table item type requires a keyboard entry into table cells.</p>",
    order: 13
  },
  {
    code: "WER",
    label: "Writing Extended Response",
    description: "<p>The Writing Extended Response item type has a text box for a response area and requires a keyboard entry of alphanumeric characters. This item type provides more space for students to provide a longer written response. It also includes text formatting tools – bold, underline, italic, numbered and bulleted lists, indentation, clipboard, undo, redo, and spell checking.</p>",
    order: 14
  }
];

export const mockSubjectModel:SubjectModel[] = [
  {
    code:"MATH",
    label:"Mathematics",
    claimCodes:["MATH1","MATH2","MATH3","MATH4"],
    interactionTypeCodes:["EQ","GI","MC","MI","MS","TI","SA"]
  },
  {
    code:"ELA",
    label:"English language arts/literacy",
    claimCodes:["ELA1","ELA2","ELA3","ELA4"],
    interactionTypeCodes:["EBSR","SA","HTQ","MC","MS","MI","WER"]
  }
];

export const mockItemsSearchModel:ItemsSearchModel = {
  interactionTypes:mockInteractionTypes,
  subjects:mockSubjectModel,
  claims:[],
  targets:[]
};
