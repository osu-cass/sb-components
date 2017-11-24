import {
  SubjectModel,
  SearchAPIParamsModel
} from "../ItemSearch/ItemSearchModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";

export enum OptionTypeModel {
  inputBox,
  button,
  radioBtn,
  DropDown
}

export enum FilterType {
  Subject,
  Grade,
  Claim,
  Performance,
  Target,
  CAT,
  InteractionType
}

export interface FilterOptionModel {
  label: string;
  key: string;
  isSelected: boolean;
  filterType: FilterType;
}

export interface BasicFilterCategoryModel extends FilterCategoryModel {
  type: OptionTypeModel;
}

export interface FilterCategoryModel {
  disabled: boolean;
  label: string;
  filterOptions: FilterOptionModel[];
  helpText?: string;
  code: FilterType;
}

export interface AdvancedFilterCategoryModel extends FilterCategoryModel {
  isMultiSelect: boolean;
  displayAllButton: boolean;
}

export interface TechType extends SubjectModel { }

export interface AdvancedFiltersModel {
  subjects: AdvancedFilterCategoryModel;
  grades: AdvancedFilterCategoryModel;
  techTypes: AdvancedFilterCategoryModel;
}
