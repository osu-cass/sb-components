import {
  FilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "../Filter/FilterModels";
import {
  FilterSearchModel,
  ItemsSearchModel,
  SearchAPIParamsModel,
  SearchBaseModel,
  SearchFilterStringTypes,
  SearchFilterTypes,
  FilterSearchStringModel,
  TargetModel,
  SearchFilterModelTypes,
  ItemsSearchFilterModel,
  ClaimModel
} from "../ItemSearch/ItemSearchModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import { Filter } from "../Filter/Filter";

// tslint:disable-next-line:no-stateless-class no-unnecessary-class
export class ItemSearch {
  public static filterToSearchApiModel(
    filterModels: FilterCategoryModel[]
  ): SearchAPIParamsModel {
    const subjects = Filter.getSelectedCodes(FilterType.Subject, filterModels);
    const gradeLevels = Filter.getSelectedGrade(filterModels);
    const claims = Filter.getSelectedCodes(FilterType.Claim, filterModels);
    const interactionTypes = Filter.getSelectedCodes(
      FilterType.InteractionType,
      filterModels
    );

    const techTypes = Filter.getSelectedCodes(
      FilterType.TechnologyType,
      filterModels
    );

    const calculatorCodes = Filter.getSelectedCodes(
      FilterType.Calculator,
      filterModels
    );

    const catOnly = techTypes
      ? techTypes.some(t => t === FilterType.CAT)
      : undefined;
    const performanceOnly = techTypes
      ? techTypes.some(t => t === FilterType.Performance)
      : undefined;
    const calculator =
      calculatorCodes && calculatorCodes.length > 0
        ? calculatorCodes[0] === "true"
        : undefined;
    const targets = Filter.getSelectedTargets(filterModels);

    return {
      subjects,
      gradeLevels,
      claims,
      interactionTypes,
      targets,
      catOnly,
      performanceOnly,
      calculator
    };
  }

  /**
   * Takes a `SearchAPIParamsModel` and the filter category that has been updated,
   * and updates the search params model accordingly, returning a copy of it with
   * the updated param added/removed.
   *
   * @param {FilterCategoryModel} category
   * @param {SearchAPIParamsModel} currentModel
   */
  public static updateSearchApiModel(
    category: FilterCategoryModel,
    currentModel: SearchAPIParamsModel
  ): SearchAPIParamsModel {
    const newModel = { ...currentModel };

    switch (category.code) {
      case FilterType.Grade:
        newModel.gradeLevels = Filter.getSelectedGrade([category]);
        break;
      case FilterType.Calculator:
        const calculatorCodes = Filter.getSelectedCodes(FilterType.Calculator, [
          category
        ]);
        newModel.calculator =
          calculatorCodes && calculatorCodes.length > 0
            ? calculatorCodes[0] === "true"
            : undefined;
        break;
      case FilterType.TechnologyType:
        const techTypes = Filter.getSelectedCodes(FilterType.TechnologyType, [
          category
        ]);
        newModel.catOnly = techTypes
          ? techTypes.some(t => t === FilterType.CAT)
          : undefined;
        newModel.performanceOnly = techTypes
          ? techTypes.some(t => t === FilterType.Performance)
          : undefined;
        break;
      case FilterType.Claim:
        const claimCodes = Filter.getSelectedCodes(category.code, [category]);
        newModel.claims = claimCodes;
        break;
      case FilterType.InteractionType:
        const itCodes = Filter.getSelectedCodes(category.code, [category]);
        newModel.interactionTypes = itCodes;
        break;
      case FilterType.Subject:
        const subjectCodes = Filter.getSelectedCodes(category.code, [category]);
        newModel.subjects = subjectCodes;
        break;
      case FilterType.Target:
        const targetCodes = Filter.getSelectedTargets([category]);
        newModel.targets = targetCodes;
        break;
      case FilterType.SearchItemId:
        const newItemID = category.filterOptions[0].key;
        newModel.itemId = newItemID;
        break;
      default:
    }

    return newModel;
  }

  /**
   * Takes a `SearchAPIParamsModel` and modifies it in place, removing the
   * dependent params whose parents are no longer visible to the user.
   *
   * @param {SearchAPIParamsModel} searchParams
   * @param {ItemsSearchModel} model
   */
  public static updateDependentSearchParams(
    searchParams: SearchAPIParamsModel,
    model: ItemsSearchModel
  ) {
    const selectedSubjects = (model.subjects || []).filter(
      s => (searchParams.subjects || []).indexOf(s.code) !== -1
    );
    const visibleClaims = selectedSubjects
      .map(s => s.claimCodes || [])
      .reduce((prev, curr) => prev.concat(curr), []);
    const visibleInteractions = selectedSubjects
      .map(s => s.interactionTypeCodes || [])
      .reduce((prev, curr) => prev.concat(curr), []);
    const visibleClaimModels = visibleClaims.map(c =>
      (model.claims || []).find(cm => cm.code === c)
    );
    const visibleTargets = visibleClaimModels
      .filter(
        c => (c ? (searchParams.claims || []).indexOf(c.code) !== -1 : false)
      )
      .map(c => (c ? c.targetCodes || [] : []))
      .reduce((prev, curr) => prev.concat(curr), []);

    searchParams.claims = searchParams.claims
      ? searchParams.claims.filter(c => visibleClaims.indexOf(c) !== -1)
      : undefined;
    searchParams.interactionTypes = searchParams.interactionTypes
      ? searchParams.interactionTypes.filter(
          i => visibleInteractions.indexOf(i) !== -1
        )
      : undefined;
    searchParams.targets = searchParams.targets
      ? searchParams.targets.filter(t => visibleTargets.indexOf(t) !== -1)
      : undefined;

    return searchParams;
  }

  public static searchOptionFilterString(
    options: SearchFilterStringTypes[],
    filterType: FilterType,
    selectedCodes?: string[]
  ): FilterOptionModel[] {
    return options.map(o => {
      return {
        filterType,
        label: o.label,
        key: o.code,
        isSelected: (selectedCodes || []).some(s => s === o.code)
      };
    });
  }

  public static searchOptionToFilterGrade(
    options: GradeLevels[],
    filterType: FilterType,
    selectedCode?: GradeLevels
  ): FilterOptionModel[] {
    return options.map(o => {
      const gradeString = GradeLevel.gradeLevelToString(o) || "";
      const selected = selectedCode
        ? GradeLevel.gradeLevelContains(selectedCode, o)
        : false;

      return {
        filterType,
        label: gradeString,
        key: String(o),
        isSelected: selected
      };
    });
  }

  public static searchOptionToFilterTarget(
    options: TargetModel[],
    filterType: FilterType,
    selectedCodes?: string[]
  ): FilterOptionModel[] {
    return options.map(o => {
      return {
        filterType,
        label: o.idLabel,
        key: o.idLabel,
        isSelected: (selectedCodes || []).some(s => s === o.idLabel)
      };
    });
  }

  public static searchOptionToFilterClaim(
    options: ClaimModel[],
    filterType: FilterType,
    selectedCodes?: string[]
  ): FilterOptionModel[] {
    return options.map(o => {
      return {
        filterType,
        label: o.label,
        key: o.code,
        isSelected: (selectedCodes || []).some(s => s === o.code)
      };
    });
  }

  public static getFilterOptionModel(
    filter: SearchFilterModelTypes,
    searchApi: SearchAPIParamsModel = {},
    defaultOptionKeys?: string[]
  ): FilterOptionModel[] {
    let options: FilterOptionModel[] = [];

    switch (filter.code) {
      case FilterType.Claim:
        options = this.searchOptionToFilterClaim(
          filter.filterOptions,
          filter.code,
          searchApi.claims === undefined || searchApi.claims.length < 1
            ? defaultOptionKeys
            : searchApi.claims
        );
        break;
      case FilterType.InteractionType:
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          searchApi.interactionTypes === undefined ||
          searchApi.interactionTypes.length < 1
            ? defaultOptionKeys
            : searchApi.interactionTypes
        );
        break;
      case FilterType.Subject:
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          searchApi.subjects === undefined || searchApi.subjects.length < 1
            ? defaultOptionKeys
            : searchApi.subjects
        );
        break;
      case FilterType.Grade:
        options = this.searchOptionToFilterGrade(
          filter.filterOptions,
          filter.code,
          searchApi.gradeLevels
        );
        break;
      case FilterType.Target:
        options = this.searchOptionToFilterTarget(
          filter.filterOptions,
          filter.code,
          searchApi.targets === undefined || searchApi.targets.length < 1
            ? defaultOptionKeys
            : searchApi.targets
        );
        break;
      case FilterType.TechnologyType:
        const techTypesCodes = this.getTechnologyTypeCodes(searchApi);
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          techTypesCodes === undefined || techTypesCodes.length < 1
            ? defaultOptionKeys
            : techTypesCodes
        );
        break;
      case FilterType.Calculator:
        const flagCodes = this.getFlagCodes(searchApi.calculator);
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          flagCodes === undefined || flagCodes.length < 1
            ? defaultOptionKeys
            : flagCodes
        );
        break;
      default:
    }

    return options;
  }

  public static getTechnologyTypeCodes(search: SearchAPIParamsModel): string[] {
    const codes: string[] = [];
    if (search.catOnly !== undefined) {
      codes.push(FilterType.CAT);
    }
    if (search.performanceOnly !== undefined) {
      codes.push(FilterType.Performance);
    }

    return codes;
  }

  public static getFlagCodes(searchFlag?: boolean): string[] {
    const codes: string[] = [];
    if (searchFlag !== undefined) {
      codes.push(String(searchFlag));
    }

    return codes;
  }

  public static filterSearchToCategory(
    filter: SearchFilterModelTypes,
    searchApi: SearchAPIParamsModel = {},
    defaultOptionKeys?: string[]
  ): FilterCategoryModel {
    const options = this.getFilterOptionModel(
      filter,
      searchApi,
      defaultOptionKeys
    );

    return {
      ...filter,
      disabled: false,
      filterOptions: options
    };
  }

  public static filterItemCards(
    itemCards: ItemCardModel[],
    filter: SearchAPIParamsModel
  ): ItemCardModel[] {
    let results = itemCards;
    // item
    if (filter.itemId && filter.itemId !== "") {
      results = results.filter(i =>
        i.itemKey.toString().includes(filter.itemId || "")
      );
    }

    // grade level
    if (filter.gradeLevels && filter.gradeLevels !== GradeLevels.NA) {
      results = results.filter(i =>
        GradeLevel.gradeLevelContains(
          filter.gradeLevels || GradeLevels.NA,
          i.grade
        )
      );
    }

    // subjects
    if (filter.subjects !== undefined && filter.subjects.length > 0) {
      const { subjects } = filter;
      results = results.filter(
        i => subjects.findIndex(s => s === i.subjectCode) !== -1
      );
    }

    // interaction types
    if (filter.interactionTypes && filter.interactionTypes.length > 0) {
      const { interactionTypes } = filter;
      results = results.filter(
        i =>
          interactionTypes.findIndex(it => it === i.interactionTypeCode) !== -1
      );
    }

    // claims
    if (filter.claims && filter.claims.length > 0) {
      const { claims } = filter;
      results = results.filter(
        i => claims.findIndex(c => c === i.claimCode) !== -1
      );
    }

    // performance & cat
    if (filter.performanceOnly === true || filter.catOnly === true) {
      const performanceTask =
        filter.catOnly !== true || filter.performanceOnly === true;
      results = results.filter(i => i.isPerformanceItem === performanceTask);
    }

    // targets
    if (filter.targets && filter.targets.length > 0) {
      const { targets } = filter;
      results = results.filter(
        i => targets.findIndex(t => t === i.targetId) !== -1
      );
    }

    // calculator
    if (filter.calculator !== undefined) {
      results = results.filter(i => i.calculator === filter.calculator);
    }

    return results;
  }
}
