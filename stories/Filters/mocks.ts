import { 
  AdvancedFilterProps,
   FilterOptionModel, 
   OptionTypeModel, 
   AdvancedFilterCategoryModel, 
   BasicFilterCategoryModel 
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
