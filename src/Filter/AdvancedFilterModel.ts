import {
  SubjectModel,
  SearchAPIParamsModel
} from "../ItemSearch/ItemSearchModels";
import { GradeLevels, stringToGradeLevel } from "../GradeLevels/GradeLevels";

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
  code: string;
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

export function parseAdvancedFilter(
  filterModels: FilterCategoryModel[]
): { [key: string]: string[] | undefined } {
  let queryObject: { [key: string]: string[] | undefined } = {};
  for (const fg of filterModels) {
    const selectedOptions: string[] =
      fg.filterOptions.filter(f => f.isSelected).map(f => f.key) || [];
    queryObject[fg.code] = selectedOptions;
  }
  return queryObject;
}

export function advancedFilterToSearch(
  filterModels: FilterCategoryModel[]
): SearchAPIParamsModel {
  const dictionary = parseAdvancedFilter(filterModels);

  const subjects = dictionary["Subject"] || [];
  const gradeString = (dictionary["Grade"] || [])[0]; //TODO: This is an array of grades, could use bitwise
  const gradeLevels = stringToGradeLevel(gradeString);
  const claims = dictionary["Claim"] || [];
  const interactionTypes = dictionary["InteractionType"] || [];
  const performanceOnly = (dictionary["Performance"] || [])[0] === "true";
  const catOnly = (dictionary["CAT"] || [])[0] === "true";
  const targetStrings = dictionary["Target"] || [];
  const targetHash = targetStrings.map(t => +t); //string[] to number[]
  const searchModel: SearchAPIParamsModel = {
    subjects: subjects,
    gradeLevels: gradeLevels,
    claims: claims,
    interactionTypes: interactionTypes,
    targets: targetHash,
    catOnly: catOnly,
    performanceOnly: performanceOnly
  };

  return searchModel;
}
