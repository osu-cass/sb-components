import { constants } from "fs";
import {
  FilterType,
  FilterCategoryModel,
  FilterOptionModel
} from "./FilterModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import {
  TargetModel,
  SubjectModel,
  ClaimModel,
  SearchAPIParamsModel,
  ItemsSearchModel,
  SearchFilterStringTypes
} from "../ItemSearch/ItemSearchModels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { ItemSearch } from "../ItemSearch/ItemSearch";
import { ItemCardModel } from "../ItemCard/ItemCardModels";

// tslint:disable-next-line:no-stateless-class, no-unnecessary-class
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
    const filterCategory = filterModels.find(f => f.code === key);

    return filterCategory
      ? filterCategory.filterOptions
          .filter(f => f.isSelected)
          .map(f => f.key) || []
      : undefined;
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
  ): string[] | undefined {
    const selectedCodes = this.getSelectedCodes(
      FilterType.Target,
      filterModels
    );

    return selectedCodes ? selectedCodes.map(s => s) : undefined;
  }
  public static filterStringTypes<T extends SearchFilterStringTypes>(
    filterOptions: T[],
    codes?: string[]
  ): T[] {
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
   * @param  {number[]} targetCodes
   */
  public static filterTargets(
    targets: TargetModel[],
    targetCodes: string[]
  ): TargetModel[] {
    const filteredTargets: TargetModel[] = [];
    targetCodes.forEach(tc => {
      const target = targets.find(t => t.idLabel === tc);
      if (target) {
        filteredTargets.push(target);
      }
    });

    return filteredTargets;
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
  public static getClaimTargetCodes(claims: ClaimModel[]): string[] {
    return claims
      .map(c => c.targetCodes || [])
      .reduce((prev, next) => prev.concat(next), [])
      .filter((tc, idx, arr) => arr.indexOf(tc) === idx);
  }

  /**
   * Gets the list of current claims from dependent subjects
   * @param {ClaimModel[]} claims
   * @param {SubjectModel[]} filteredSubjects
   */
  public static getCurrentClaimsFilter(
    claims: ClaimModel[],
    filteredSubjects: SubjectModel[]
  ): ClaimModel[] | undefined {
    let filteredClaims: ClaimModel[] | undefined;

    if (filteredSubjects && filteredSubjects.length > 0) {
      const subjectClaims = this.getSubjectClaimCodes(filteredSubjects);
      filteredClaims = this.filterStringTypes(claims, subjectClaims);
    }

    return filteredClaims;
  }

  /**
   * Gets the list of current interaction types from dependent subjects
   * @param  {InteractionTypeModel[]} interactionTypes
   * @param  {SubjectModel[]} filteredSubjects
   */
  public static getCurrentInteractionTypes(
    interactionTypes: InteractionTypeModel[],
    filteredSubjects: SubjectModel[]
  ): InteractionTypeModel[] | undefined {
    let filteredIntTypes: InteractionTypeModel[] | undefined;
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
    let filteredTargets: TargetModel[] | undefined;

    if (searchApiModel.claims && searchApiModel.claims.length > 0) {
      const selectedClaims = filteredClaims.filter(
        c =>
          /* tslint:disable: no-non-null-assertion */
          searchApiModel.claims!.indexOf(c.code) !== -1
      );
      const targetCodes = this.getClaimTargetCodes(selectedClaims);
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

      // claims
      if (claimFilterIdx !== -1 && model.claims) {
        filteredClaims =
          this.getCurrentClaimsFilter(model.claims, filteredSubjects) || [];

        let filterOptions: FilterOptionModel[] = [];
        if (searchAPI.subjects && searchAPI.subjects.length > 0) {
          filterOptions = ItemSearch.searchOptionToFilterClaim(
            filteredClaims,
            FilterType.Claim,
            searchAPI.claims
          );
        }

        filters[claimFilterIdx].filterOptions = filterOptions;
      }

      // interaction types
      if (interactionFilterIdx !== -1 && model.interactionTypes) {
        const filteredInteractions =
          this.getCurrentInteractionTypes(
            model.interactionTypes,
            filteredSubjects
          ) || [];

        let filterOptions: FilterOptionModel[] = [];
        if (searchAPI.subjects && searchAPI.subjects.length > 0) {
          filterOptions = ItemSearch.searchOptionFilterString(
            filteredInteractions,
            FilterType.InteractionType,
            searchAPI.interactionTypes
          );
        }

        filters[interactionFilterIdx].filterOptions = filterOptions;
      }

      // targets
      if (targetFilterIdx !== -1 && model.targets && filteredClaims) {
        const filteredTargets =
          this.getCurrentTargets(model.targets, searchAPI, filteredClaims) ||
          [];
        let filterOptions: FilterOptionModel[] = [];
        if (filteredTargets && filteredTargets.length > 0) {
          filterOptions = ItemSearch.searchOptionToFilterTarget(
            filteredTargets,
            FilterType.Target,
            searchAPI.targets
          );
        }

        filters[targetFilterIdx].filterOptions = filterOptions;
      }
    }

    return filters;
  }

  /**
   * Updates the options in the `filter` based on the options in `basedOn`. This happens in place.
   *
   * @param {T extends FilterCategoryModel} filter
   * @param {FilterCategoryModel} basedOn
   */
  public static updateSingleFilter<T extends FilterCategoryModel>(
    filter: T,
    basedOn: FilterCategoryModel
  ): T {
    filter.filterOptions.forEach(fo => {
      const updatedOption = basedOn.filterOptions.find(o => o.key === fo.key);
      fo.isSelected = updatedOption ? updatedOption.isSelected : false;
    });

    return filter;
  }

  public static hideFiltersBasedOnSearchParams<T extends FilterCategoryModel>(
    filterList: T[],
    searchParams: SearchAPIParamsModel
  ): T[] {
    const calculatorFilter = filterList.find(
      f => f.code === FilterType.Calculator
    );
    if (searchParams.subjects && searchParams.subjects.indexOf("MATH") !== -1) {
      if (calculatorFilter) {
        calculatorFilter.disabled = false;
      }
    } else {
      if (calculatorFilter) {
        calculatorFilter.disabled = true;
      }
    }

    return filterList;
  }

  public static hideTargetOptions<T extends FilterCategoryModel>(
    filterCategories: T[],
    itemCards: ItemCardModel[]
  ): T[] {
    const targetFilter = filterCategories.find(
      f => f.code === FilterType.Target
    );

    if (targetFilter) {
      targetFilter.filterOptions = targetFilter.filterOptions.filter(
        opt => itemCards.findIndex(card => card.targetId === opt.label) !== -1
      );
    }

    return filterCategories;
  }
}
