import { Filter } from "../Filter/Filter";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "../Filter/FilterModels";

export type SearchFilterStringTypes =
  | SubjectModel
  | InteractionTypeModel
  | SearchBaseModel;
export type SearchFilterTypes =
  | SearchFilterStringTypes
  | TargetModel
  | GradeLevels
  | ClaimModel;
export type SearchFilterModelTypes =
  | FilterSearchGradeLevelModel
  | FilterSearchStringModel<SearchFilterStringTypes>
  | FilterSearchTargetModel
  | FilterSearchClaimModel;

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
  claimNumber: string;
}

export interface TargetModel {
  name: string;
  nameHash: number;
  idLabel: string;
  id: string;
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
  calculator?: boolean;
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
  calculator: FilterSearchStringModel<SearchBaseModel>;
}

export interface FilterSearchModel {
  label: string;
  helpText?: string;
  code: FilterType;
  filterOptions: SearchFilterTypes[];
}

export interface FilterSearchStringModel<T extends SearchFilterStringTypes>
  extends FilterSearchModel {
  filterOptions: T[];
  code:
    | FilterType.InteractionType
    | FilterType.Subject
    | FilterType.TechnologyType
    | FilterType.Calculator;
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

export interface FilterSearchClaimModel extends FilterSearchModel {
  filterOptions: ClaimModel[];
  code: FilterType.Claim;
}
