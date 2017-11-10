import { 
  AdvancedFilterProps,
   FilterOptionModel, 
   OptionTypeModel, 
   AdvancedFilterCategoryModel, 
   BasicFilterCategoryModel 
  } from '../../src';
import { action } from '@storybook/addon-actions';

const gradeFilterOptions: FilterOptionModel[] = [
  {label: "Grades 3-5", key: "7", isSelected: false},
  {label: "Grades 6-8", key: "56", isSelected: false},
  {label: "High School", key: "960", isSelected: false}

]

const subjectsFilterOptions: FilterOptionModel[] = [
  {label: "English Literacy/ Arts", key: "ELA", isSelected: false},
  {label: "Mathematics", key: "Math", isSelected: false}

]

export const mockAdvancedFilterCategories: AdvancedFilterCategoryModel[] = [
  {disabled: false, isMultiSelect: false, label: "Grade", filterOptions: gradeFilterOptions, displayAllButton: true, helpText: "Grade Help"},
  {disabled: false, isMultiSelect: true, label: "Subjects", filterOptions:subjectsFilterOptions, displayAllButton: false, helpText: "Subject Help"}
]


export const mockBasicFilterCategories: BasicFilterCategoryModel[] = [
  {disabled: false, label: "Grade", filterOptions: gradeFilterOptions, type: OptionTypeModel.DropDown},
  {disabled: false, label: "Subjects", filterOptions:subjectsFilterOptions, type:OptionTypeModel.radioBtn}
]


  
const advancedFilterOption: FilterOptionModel = {
    label: "Grade 3",
    key: "12345",
    isSelected: false
}

const advancedFilterCategory: AdvancedFilterCategoryModel  = {
    disabled: false,
    isMultiSelect: false,
    label: "Grade 3",
    helpText: "Grade 3",
    filterOptions: [advancedFilterOption],
    displayAllButton: true
}

const selectedHandler = action("clicked filter");

export const advancedFilterOptionsArray: FilterOptionModel[] = [
  {...advancedFilterOption, label: "Grade 1", key: "12346"},
  {...advancedFilterOption, label: "Grade 2", key: "12347"},
  {...advancedFilterOption},
  {...advancedFilterOption, label: "Grade 4", key: "12348"}
]

export const advancedFilterProps: AdvancedFilterProps = {
    ...advancedFilterCategory,
    selectedHandler
}
