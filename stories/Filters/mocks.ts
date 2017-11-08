import { Props } from '../../src/Filter/AdvancedFilter';
import { FilterOption, OptionType, AdvancedFilterCategory, BasicFilterCategory } from '../../src/Filter/AdvancedFilterModel';
import { action } from '@storybook/addon-actions';

const gradeFilterOptions: FilterOption[] = [
  {label: "Grades 3-5", key: "7", isSelected: false},
  {label: "Grades 6-8", key: "56", isSelected: false},
  {label: "High School", key: "960", isSelected: false}

]

const subjectsFilterOptions: FilterOption[] = [
  {label: "English Literacy/ Arts", key: "ELA", isSelected: false},
  {label: "Mathematics", key: "Math", isSelected: false}

]

export const mockAdvancedFilterCategories: AdvancedFilterCategory[] = [
  {disabled: false, isMultiSelect: false, label: "Grade", filterOptions: gradeFilterOptions, displayAllButton: true, helpText: "Grade Help"},
  {disabled: false, isMultiSelect: true, label: "Subjects", filterOptions:subjectsFilterOptions, displayAllButton: false, helpText: "Subject Help"}
]


export const mockBasicFilterCategories: BasicFilterCategory[] = [
  {disabled: false, label: "Grade", filterOptions: gradeFilterOptions, type: OptionType.DropDown},
  {disabled: false, label: "Subjects", filterOptions:subjectsFilterOptions, type:OptionType.radioBtn}
]


  
const advancedFilterOption: FilterOption = {
    label: "Grade 3",
    key: "12345",
    isSelected: false
}

const advancedFilterCategory: AdvancedFilterCategory  = {
    disabled: false,
    isMultiSelect: false,
    label: "Grade 3",
    helpText: "Grade 3",
    filterOptions: [advancedFilterOption],
    displayAllButton: true
}

const selectedHandler = action("clicked filter");

export const advancedFilterOptionsArray: FilterOption[] = [
  {...advancedFilterOption, label: "Grade 1", key: "12346"},
  {...advancedFilterOption, label: "Grade 2", key: "12347"},
  {...advancedFilterOption},
  {...advancedFilterOption, label: "Grade 4", key: "12348"}
]

export const advancedFilterProps: Props = {
    ...advancedFilterCategory,
    selectedHandler
}
