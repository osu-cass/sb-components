import { SubjectModel } from "@src/index";
/**
 * Updates a category with the filter option that was selected
 * @param {AdvancedFilterCategoryModel[]} categories
 * @param {AdvancedFilterCategoryModel} selectedCat
 * @param {FilterOptionModel} [option]
 */
export declare const advFilterSelect: (categories: AdvancedFilterCategoryModel[], selectedCat: AdvancedFilterCategoryModel, option?: FilterOptionModel | undefined) => AdvancedFilterCategoryModel[] | undefined;
export declare function advFilterCategorySelect(selectedCat: AdvancedFilterCategoryModel, option?: FilterOptionModel): AdvancedFilterCategoryModel;
export declare enum OptionTypeModel {
    inputBox = 0,
    button = 1,
    radioBtn = 2,
    DropDown = 3,
    AdvFilter = 4,
}
export declare enum FilterType {
    Subject = "Subject",
    Grade = "Grade",
    Claim = "Claim",
    Performance = "Performance",
    Target = "Target",
    CAT = "CAT",
    InteractionType = "InteractionType",
    Calculator = "Calculator",
    TechnologyType = "TechnologyType",
    SearchItemId = "SearchItemId",
}
export interface FilterOptionModel {
    label: string;
    key: string;
    isSelected: boolean;
    filterType?: FilterType;
}
export interface BasicFilterCategoryModel extends FilterCategoryModel {
    optionType: OptionTypeModel;
    placeholderText?: string;
}
export interface FilterCategoryModel {
    disabled: boolean;
    label: string;
    filterOptions: FilterOptionModel[];
    helpText?: string;
    emptyOptionsText?: string;
    code: FilterType;
    isMultiSelect?: boolean;
}
export interface AdvancedFilterCategoryModel extends FilterCategoryModel {
    displayAllButton: boolean;
}
export interface TechType extends SubjectModel {
}
export interface AdvancedFiltersModel {
    subjects: AdvancedFilterCategoryModel;
    grades: AdvancedFilterCategoryModel;
    techTypes: AdvancedFilterCategoryModel;
}
