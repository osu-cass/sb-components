import {
  SearchBaseModel,
  SearchFilterTypes,
  SearchFilterStringTypes
} from "../ItemSearch/ItemSearchModels";
import {
  ItemCardModel,
  ClaimModel,
  ItemsSearchModel,
  SearchAPIParamsModel,
  SubjectModel,
  TargetModel,
  ItemsSearchFilterModel,
  GradeLevels,
  GradeLevel,
  AdvancedFilterCategoryModel,
  FilterCategoryModel,
  FilterOptionModel,
  FilterType,
  ItemSearch
} from "../index";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";

// tslint:disable-next-line:no-stateless-class
export class Filter {
  /**
   * Returns a list of selected codes for the given FilterType and Categories
   * @param  {FilterType} key
   * @param  {FilterCategoryModel[]} filterModels
   */
  public static getSelectedCodes(
    key: FilterType,
    filterModels: FilterCategoryModel[]
  ): string[] | undefined {
    let filterCategory = filterModels.find(f => f.code === key);
    if (filterCategory) {
      return (
        filterCategory.filterOptions
          .filter(f => f.isSelected)
          .map(f => f.key) || []
      );
    } else {
      return undefined;
    }
  }

  /**
   * Reduces Filter Models for grade selections
   * Exclusive OR to flip the bits for selected grades
   * @param  {FilterCategoryModel[]} filterModels
   */
  public static getSelectedGrade(
    filterModels: FilterCategoryModel[]
  ): GradeLevels | undefined {
    const selectedCodes = this.getSelectedCodes(FilterType.Grade, filterModels);
    let gradeLevel: GradeLevels | undefined;

    if (selectedCodes) {
      const gradesLevel = selectedCodes.reduce<GradeLevels>(
        (previous, next) => {
          return GradeLevel.gradeLevelAdd(previous, next);
        },
        GradeLevels.NA
      );
      gradeLevel = gradesLevel;
    }

    return gradeLevel;
  }

  /**
   * Gets selected target hash values
   * @param  {FilterCategoryModel[]} filterModels
   */
  public static getSelectedTargets(
    filterModels: FilterCategoryModel[]
  ): number[] | undefined {
    const selectedCodes = this.getSelectedCodes(
      FilterType.Target,
      filterModels
    );

    return selectedCodes ? selectedCodes.map(s => +s) : undefined;
  }
  public static filterStringTypes<T extends SearchFilterStringTypes>(
    filterOptions: T[],
    codes?: string[]
  ): Array<T> {
    let filteredClaims = filterOptions;
    if (codes && codes.length > 0) {
      filteredClaims = filteredClaims.filter(s =>
        codes.some(ssc => ssc === s.code)
      );
    }
    return filteredClaims;
  }

  /**
   * Filters targets with the given codes
   * @param  {TargetModel[]} targets
   * @param  {number[]} targetCodes?
   */
  public static filterTargets(
    targets: TargetModel[],
    targetCodes?: number[]
  ): TargetModel[] {
    let filteredClaims = targets;

    if (targetCodes && targetCodes.length > 0) {
      filteredClaims = filteredClaims.filter(s =>
        targetCodes.some(ssc => ssc === s.nameHash)
      );
    }
    return filteredClaims;
  }

  /** Returns the list of related claims
   * @param  {SubjectModel[]} subjects
   */
  public static getSubjectClaimCodes(subjects: SubjectModel[]): string[] {
    return subjects
      .map(s => s.claimCodes || [])
      .reduce((pc, cc) => pc.concat(cc), []);
  }

  /**
   * Returns the list of related interaction types
   * @param  {SubjectModel[]} subjects
   */
  public static getSubjectInteractionTypes(subjects: SubjectModel[]): string[] {
    return subjects
      .map(s => s.interactionTypeCodes || [])
      .reduce((pc, cc) => pc.concat(cc), []);
  }

  /**
   * Returns the list of related target codes
   * @param  {ClaimModel[]} claims
   */
  public static getClaimTargetCodes(claims: ClaimModel[]): number[] {
    return claims
      .map(c => c.targetCodes || [])
      .reduce((prev, next) => prev.concat(next), []);
  }

  /**
   * Gets the list of current claims from dependent subjects
   * @param  {ItemsSearchModel} model
   * @param  {SearchAPIParamsModel} searchApiModel
   */
  public static getCurrentClaimsFilter(
    claims: ClaimModel[],
    searchApiModel: SearchAPIParamsModel,
    filteredSubjects: SubjectModel[]
  ): ClaimModel[] | undefined {
    let filteredClaims: ClaimModel[] | undefined = undefined;

    if (filteredSubjects && filteredSubjects.length > 0) {
      const subjectClaims = this.getSubjectClaimCodes(filteredSubjects);
      filteredClaims = this.filterStringTypes(claims, subjectClaims);
    }
    return filteredClaims;
  }

  /**
   * Gets the list of current interaction types from dependent subjects
   * @param  {ItemsSearchModel} model
   * @param  {SearchAPIParamsModel} searchApiModel
   */
  public static getCurrentInteractionTypes(
    interactionTypes: InteractionTypeModel[],
    searchApiModel: SearchAPIParamsModel,
    filteredSubjects: SubjectModel[]
  ): InteractionTypeModel[] | undefined {
    let filteredIntTypes: InteractionTypeModel[] | undefined = undefined;
    if (filteredSubjects.length > 0) {
      const subjectInteractionTypes = this.getSubjectInteractionTypes(
        filteredSubjects
      );
      filteredIntTypes = this.filterStringTypes(
        interactionTypes,
        subjectInteractionTypes
      );
    }
    return filteredIntTypes;
  }

  /**
   * Gets the list of current targets from dependent subjects and claims
   * @param  {ItemsSearchModel} model
   * @param  {SearchAPIParamsModel} searchApiModel
   */
  public static getCurrentTargets(
    targets: TargetModel[],
    searchApiModel: SearchAPIParamsModel,
    filteredClaims: ClaimModel[]
  ): TargetModel[] | undefined {
    let filteredTargets: TargetModel[] | undefined = undefined;

    if (filteredClaims.length > 0) {
      const targetCodes = this.getClaimTargetCodes(filteredClaims);
      filteredTargets = this.filterTargets(targets, targetCodes);
    }

    return filteredTargets;
  }

  /**
   * Returns Filter Categories with the updated dependent lists with selected values
   * Dependent list Target, Claim, and Interaction Types
   * @param  {ItemsSearchModel} model
   * @param  {FilterCategoryModel[]} filters
   * @param  {SearchAPIParamsModel} searchAPI
   */
  public static getUpdatedSearchFilters<T extends FilterCategoryModel>(
    model: ItemsSearchModel,
    filters: T[],
    searchAPI: SearchAPIParamsModel
  ): T[] {
    if (model.subjects) {
      const filteredSubjects = this.filterStringTypes(
        model.subjects,
        searchAPI.subjects
      );
      let filteredClaims: ClaimModel[] | undefined;

      const claimFilterIdx = filters.findIndex(
        f => f.code === FilterType.Claim
      );
      const interactionFilterIdx = filters.findIndex(
        f => f.code === FilterType.InteractionType
      );
      const targetFilterIdx = filters.findIndex(
        f => f.code === FilterType.Target
      );

      if (claimFilterIdx !== -1 && model.claims) {
        filteredClaims =
          this.getCurrentClaimsFilter(
            model.claims,
            searchAPI,
            filteredSubjects
          ) || [];

        const filterOptions = ItemSearch.searchOptionFilterString(
          filteredClaims,
          FilterType.Claim,
          searchAPI.claims
        );
        filters[claimFilterIdx].filterOptions = filterOptions;
      }

      if (interactionFilterIdx !== -1 && model.interactionTypes) {
        const filteredInteractions =
          this.getCurrentInteractionTypes(
            model.interactionTypes,
            searchAPI,
            filteredSubjects
          ) || [];
        const filterOptions = ItemSearch.searchOptionFilterString(
          filteredInteractions,
          FilterType.InteractionType,
          searchAPI.interactionTypes
        );
        filters[interactionFilterIdx].filterOptions = filterOptions;
      }

      if (targetFilterIdx !== -1 && model.targets && filteredClaims) {
        const filteredTargets =
          this.getCurrentTargets(model.targets, searchAPI, filteredClaims) ||
          [];
        const filterOptions = ItemSearch.searchOptionToFilterTarget(
          filteredTargets,
          FilterType.InteractionType,
          searchAPI.targets
        );
        filters[targetFilterIdx].filterOptions = filterOptions;
      }
    }

    return filters;
  }
}
