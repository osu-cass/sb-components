import {
  ClaimModel,
  ItemsSearchModel,
  SearchAPIParamsModel,
  SearchBaseModel,
  SearchFilterTypes,
  SubjectModel,
  TargetModel,
  ItemsSearchFilterModel
} from "../ItemSearch/ItemSearchModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import {
  AdvancedFilterCategoryModel,
  FilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "../Filter/AdvancedFilterModel";
import { ItemSearch } from "../ItemSearch/ItemSearch";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";

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
    let gradeLevel: GradeLevels | undefined = undefined;

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
   * Evaluates filtered categories for the given filter type to bool or undefined
   * @param  {FilterType} key
   * @param  {FilterCategoryModel[]} filterModels
   */
  public static getSelectedFlag(
    key: FilterType,
    filterModels: FilterCategoryModel[]
  ): boolean | undefined {
    const selectedCodes = this.getSelectedCodes(key, filterModels);
    return selectedCodes && selectedCodes.length > 0
      ? selectedCodes[0] === "true"
      : undefined;
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

  /**
   * Filters subjects with the given codes
   * @param  {SubjectModel[]} subjects
   * @param  {string[]} subjectCodes?
   */
  public static filterSubjects(
    subjects: SubjectModel[],
    subjectCodes?: string[]
  ): SubjectModel[] {
    let filteredSubjects = subjects;

    if (subjectCodes && subjectCodes.length > 0) {
      filteredSubjects = filteredSubjects.filter(s =>
        subjectCodes.some(ssc => ssc === s.code)
      );
    }
    return filteredSubjects;
  }

  /**
   * Filters claims with the given codes
   * @param  {ClaimModel[]} claims
   * @param  {string[]} claimCodes?
   */
  public static filterClaims(
    claims: ClaimModel[],
    claimCodes?: string[]
  ): ClaimModel[] {
    let filteredClaims = claims;

    if (claimCodes && claimCodes.length > 0) {
      filteredClaims = filteredClaims.filter(s =>
        claimCodes.some(ssc => ssc === s.code)
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

  /**
   * Filters interaction types with the given codes
   * @param  {InteractionTypeModel[]} interactionTypes
   * @param  {string[]} interactionTypeCodes?
   */
  public static filterInteractionTypes(
    interactionTypes: InteractionTypeModel[],
    interactionTypeCodes?: string[]
  ) {
    let filteredClaims = interactionTypes;
    if (interactionTypeCodes && interactionTypeCodes.length > 0) {
      filteredClaims = filteredClaims.filter(s =>
        interactionTypeCodes.some(ssc => ssc === (s.code as string))
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
    model: ItemsSearchModel,
    searchApiModel: SearchAPIParamsModel,
    filteredSubjects?: SubjectModel[]
  ): ClaimModel[] | undefined {
    filteredSubjects =
      filteredSubjects ||
      this.filterSubjects(model.subjects, searchApiModel.subjects);
    let filteredClaims: ClaimModel[] | undefined = undefined;

    if (filteredSubjects.length > 0) {
      const subjectClaims = this.getSubjectClaimCodes(filteredSubjects);
      filteredClaims = this.filterClaims(model.claims, subjectClaims);
    }
    return filteredClaims;
  }

  /**
   * Gets the list of current interaction types from dependent subjects
   * @param  {ItemsSearchModel} model
   * @param  {SearchAPIParamsModel} searchApiModel
   */
  public static getCurrentInteractionTypes(
    model: ItemsSearchModel,
    searchApiModel: SearchAPIParamsModel,
    filteredSubjects?: SubjectModel[]
  ): InteractionTypeModel[] | undefined {
    filteredSubjects =
      filteredSubjects ||
      this.filterSubjects(model.subjects, searchApiModel.subjects);

    let filteredIntTypes: InteractionTypeModel[] | undefined = undefined;
    if (filteredSubjects.length > 0) {
      const subjectInteractionTypes = this.getSubjectInteractionTypes(
        filteredSubjects
      );
      filteredIntTypes = this.filterInteractionTypes(
        model.interactionTypes,
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
    model: ItemsSearchModel,
    searchApiModel: SearchAPIParamsModel,
    filteredClaims?: ClaimModel[]
  ): TargetModel[] | undefined {
    filteredClaims =
      filteredClaims || this.getCurrentClaimsFilter(model, searchApiModel);

    let filteredTargets: TargetModel[] | undefined = undefined;

    if (filteredClaims && filteredClaims.length > 0) {
      const targetCodes = this.getClaimTargetCodes(filteredClaims);
      filteredTargets = this.filterTargets(model.targets, targetCodes);
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
  public static getUpdatedSearchFilters(
    model: ItemsSearchModel,
    filters: FilterCategoryModel[],
    searchAPI: SearchAPIParamsModel
  ): FilterCategoryModel[] {
    searchAPI = searchAPI || ItemSearch.filterToSearchApiModel(filters);
    filters = filters.slice();

    let subjectFilter = filters.find(f => f.code === FilterType.Subject);
    if (subjectFilter) {
      const filteredSubjects = this.filterSubjects(
        model.subjects,
        searchAPI.subjects
      );
      let filteredClaims: ClaimModel[] | undefined = undefined;

      let claimFilterIdx = filters.findIndex(f => f.code === FilterType.Claim);
      let interactionFilterIdx = filters.findIndex(
        f => f.code === FilterType.InteractionType
      );
      let targetFilterIdx = filters.findIndex(
        f => f.code === FilterType.Target
      );

      if (claimFilterIdx !== -1) {
        filteredClaims =
          this.getCurrentClaimsFilter(model, searchAPI, filteredSubjects) || [];

        const filterOptions = ItemSearch.searchOptionFilterString(
          filteredClaims,
          FilterType.Claim,
          searchAPI.claims
        );
        filters[claimFilterIdx].filterOptions = filterOptions;
      }

      if (interactionFilterIdx !== -1) {
        const filteredInteractions =
          this.getCurrentInteractionTypes(model, searchAPI, filteredSubjects) ||
          [];
        const filterOptions = ItemSearch.searchOptionFilterString(
          filteredInteractions,
          FilterType.InteractionType,
          searchAPI.interactionTypes
        );
        filters[interactionFilterIdx].filterOptions = filterOptions;
      }

      if (targetFilterIdx !== -1) {
        const filteredTargets =
          this.getCurrentTargets(model, searchAPI, filteredClaims) || [];
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
