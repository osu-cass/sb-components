import {
  SubjectModel,
  SearchAPIParamsModel
} from "../ItemSearch/ItemSearchModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";

/**
 * Updates a category with the filter option that was selected
 * @param {(filterCategories: AdvancedFilterCategoryModel[]) => void} onUpdateFilter
 * @param {AdvancedFilterCategoryModel[]} categories
 * @param {AdvancedFilterCategoryModel} category
 * @param {FilterOptionModel} [option]
 */
export const onFilterSelect = (
  categories: AdvancedFilterCategoryModel[],
  selectedCat: AdvancedFilterCategoryModel,
  option?: FilterOptionModel
): AdvancedFilterCategoryModel[] | undefined => {
  const allPressed = option === undefined && selectedCat.displayAllButton;
  if (!selectedCat.disabled) {
    const categoryIndex = categories.indexOf(selectedCat);
    let options = categories[categoryIndex].filterOptions.slice();
    if (allPressed) {
      options.forEach((opt: FilterOptionModel) => (opt.isSelected = false));
    }
    if (option) {
      const optionIdx = options.indexOf(option);
      options[optionIdx].isSelected = !option.isSelected;
      if (!selectedCat.isMultiSelect) {
        options.forEach((opt: FilterOptionModel) => {
          opt.isSelected = opt === option ? opt.isSelected : false;
        });
      }
    }
    categories[categoryIndex].filterOptions = options;
    return categories;
  }
};
export enum OptionTypeModel {
  inputBox,
  button,
  radioBtn,
  DropDown
}

export enum FilterType {
  Subject = "Subject",
  Grade = "Grade",
  Claim = "Claim",
  Performance = "Performance",
  Target = "Target",
  CAT = "CAT",
  InteractionType = "InteractionType",
  TechnologyType = "TechnologyType" //Contains Performance and CAT
}

export interface FilterOptionModel {
  label: string;
  key: string;
  isSelected: boolean;
  filterType?: FilterType;
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

export interface TechType extends SubjectModel {}

export interface AdvancedFiltersModel {
  subjects: AdvancedFilterCategoryModel;
  grades: AdvancedFilterCategoryModel;
  techTypes: AdvancedFilterCategoryModel;
}
