import { SubjectModel } from "../ItemSearch/ItemSearchModels";

export enum OptionTypeModel {
  inputBox,
  button,
  radioBtn,
  DropDown
}

export interface FilterOptionModel {
  label: string;
  key: string;
  isSelected: boolean;
}

export interface BasicFilterCategoryModel extends FilterCategoryModel {
  type: OptionTypeModel;
}

export interface FilterCategoryModel {
  disabled: boolean;
  label: string;
  filterOptions: FilterOptionModel[];
  helpText?: string;
}

export interface AdvancedFilterCategoryModel extends FilterCategoryModel {
  isMultiSelect: boolean;
  filterOptions: FilterOptionModel[];
  displayAllButton: boolean;
}

export interface TechType extends SubjectModel {}

export interface AdvancedFiltersModel {
  subjects: AdvancedFilterCategoryModel;
  grades: AdvancedFilterCategoryModel;
  techTypes: AdvancedFilterCategoryModel;
}
