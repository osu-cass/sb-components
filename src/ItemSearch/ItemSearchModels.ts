import { Filter } from "../Filter/Filter";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "../Filter/AdvancedFilterModel";

export type SearchFilterStringTypes =
  | ClaimModel
  | SubjectModel
  | InteractionTypeModel
  | SearchBaseModel;
export type SearchFilterTypes =
  | SearchFilterStringTypes
  | TargetModel
  | GradeLevel;
export type SearchFilterModelTypes =
  | FilterSearchGradeLevelModel
  | FilterSearchStringModel<SearchFilterStringTypes>
  | FilterSearchTargetModel;

export interface SubjectClaimsModel {
  [subject: string]: { text: string; value: string }[];
}

export interface SearchBaseModel {
  label: string;
  code: string;
}

export interface SubjectModel extends SearchBaseModel {
  claimCodes?: string[];
  interactionTypeCodes?: string[];
}

export interface ClaimModel extends SearchBaseModel {
  targetCodes?: number[];
}

export interface TargetModel {
  name: string;
  nameHash: number;
}

export interface SearchAPIParamsModel {
  itemId?: string;
  gradeLevels?: GradeLevels;
  subjects?: string[];
  claims?: string[];
  interactionTypes?: string[];
  performanceOnly?: boolean;
  catOnly?: boolean;
  targets?: number[];
}

export interface ItemsSearchModel {
  interactionTypes?: InteractionTypeModel[];
  subjects?: SubjectModel[];
  claims?: ClaimModel[];
  targets?: TargetModel[];
}

export interface ItemsSearchFilterModel {
  interactionTypes: FilterSearchStringModel<InteractionTypeModel>;
  subjects: FilterSearchStringModel<SubjectModel>;
  claims: FilterSearchStringModel<ClaimModel>;
  targets: FilterSearchTargetModel;
  grades: FilterSearchGradeModel;
  technologyTypes: FilterSearchStringModel<SearchBaseModel>;
}

export interface FilterSearchModel {
  label: string;
  helpText?: string;
  code: FilterType;
  filterOptions: SearchFilterTypes[];
}

export interface FilterSearchStringModel<T> extends FilterSearchModel {
  filterOptions: T[];
  code:
    | FilterType.Claim
    | FilterType.InteractionType
    | FilterType.Subject
    | FilterType.TechnologyType;
}

export interface FilterSearchGradeLevelModel extends FilterSearchModel {
  filterOptions: GradeLevels[];
  code: FilterType.Grade;
}

export interface FilterSearchTargetModel extends FilterSearchModel {
  filterOptions: TargetModel[];
  code: FilterType.Target;
}

export interface FilterSearchGradeModel extends FilterSearchModel {
  filterOptions: GradeLevels[];
  code: FilterType.Grade;
}
