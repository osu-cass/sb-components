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

export class ItemSearch {
  public static filterToSearchApiModel(
    filterModels: FilterCategoryModel[]
  ): SearchAPIParamsModel {
    const subjects = Filter.getSelectedCodes(FilterType.Subject, filterModels);
    const grade = Filter.getSelectedGrade(filterModels);
    const claims = Filter.getSelectedCodes(FilterType.Claim, filterModels);
    const interactionTypes = Filter.getSelectedCodes(
      FilterType.InteractionType,
      filterModels
    );

    const techTypes = Filter.getSelectedCodes(
      FilterType.TechnologyType,
      filterModels
    );
    const catOnly = techTypes
      ? techTypes.some(t => t === FilterType.CAT)
      : undefined;
    const performanceOnly = techTypes
      ? techTypes.some(t => t === FilterType.Performance)
      : undefined;

    const targets = Filter.getSelectedTargets(filterModels);

    const searchModel: SearchAPIParamsModel = {
      subjects: subjects,
      gradeLevels: grade,
      claims: claims,
      interactionTypes: interactionTypes,
      targets: targets,
      catOnly: catOnly,
      performanceOnly: performanceOnly
    };

    return searchModel;
  }

  public static searchOptionFilterString(
    options: SearchFilterStringTypes[],
    filterType: FilterType,
    selectedCodes?: string[]
  ): FilterOptionModel[] {
    return options.map(o => {
      return {
        label: o.label,
        key: o.code,
        isSelected: (selectedCodes || []).some(s => s === o.code),
        filterType: filterType
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
        ? GradeLevel.gradeLevelContains(o, selectedCode)
        : false;
      return {
        label: gradeString,
        key: gradeString,
        isSelected: selected,
        filterType: filterType
      };
    });
  }

  public static searchOptionToFilterTarget(
    options: TargetModel[],
    filterType: FilterType,
    selectedCodes?: number[]
  ): FilterOptionModel[] {
    return options.map(o => {
      return {
        label: o.name,
        key: o.nameHash.toString(),
        isSelected: (selectedCodes || []).some(s => s === o.nameHash),
        filterType: filterType
      };
    });
  }

  public static getFilterOptionModel(
    filter: SearchFilterModelTypes,
    searchApi: SearchAPIParamsModel = {}
  ): FilterOptionModel[] {
    let options: FilterOptionModel[] = [];

    switch (filter.code) {
      case FilterType.Claim:
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          searchApi.claims
        );
        break;
      case FilterType.InteractionType:
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          searchApi.interactionTypes
        );
        break;
      case FilterType.Subject:
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          searchApi.subjects
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
          searchApi.targets
        );
        break;
      case FilterType.TechnologyType:
        options = this.searchOptionFilterString(
          filter.filterOptions,
          filter.code,
          this.getTechnologyTypeCodes(searchApi)
        );
        break;
    }

    return options;
  }

  public static getTechnologyTypeCodes(search: SearchAPIParamsModel): string[] {
    let codes: string[] = [];
    if (search.catOnly !== undefined) {
      codes.push(FilterType.CAT);
    }
    if (search.performanceOnly !== undefined) {
      codes.push(FilterType.Performance);
    }
    return codes;
  }

  public static filterSearchToCategory(
    filter: SearchFilterModelTypes,
    searchApi: SearchAPIParamsModel = {}
  ): FilterCategoryModel {
    const options = this.getFilterOptionModel(filter, searchApi);

    const category: FilterCategoryModel = {
      ...filter,
      disabled: false,
      filterOptions: options
    };

    return category;
  }

  public static filterItemCards(
    itemCards: ItemCardModel[],
    filter: SearchAPIParamsModel
  ): ItemCardModel[] {
    let results = itemCards;
    //item
    if (filter.itemId && filter.itemId !== "") {
      results = results.filter(i =>
        i.itemKey.toString().includes(filter.itemId || "")
      );
    }

    //grade level
    if (filter.gradeLevels && filter.gradeLevels != GradeLevels.NA) {
      results = results.filter(i =>
        GradeLevel.gradeLevelContains(
          filter.gradeLevels || GradeLevels.NA,
          i.grade
        )
      );
    }

    //subjects
    if (filter.subjects && filter.subjects.length > 0) {
      results = results.filter(
        i => filter.subjects!.findIndex(s => s === i.subjectCode) !== -1
      );
    }

    //interaction types
    if (filter.interactionTypes && filter.interactionTypes.length > 0) {
      results = results.filter(
        i =>
          filter.interactionTypes!.findIndex(
            it => it === i.interactionTypeCode
          ) !== -1
      );
    }

    //claims
    if (filter.claims && filter.claims.length > 0) {
      results = results.filter(
        i => filter.claims!.findIndex(c => c === i.claimCode) !== -1
      );
    }

    //performance & cat
    if (filter.performanceOnly === true || filter.catOnly === true) {
      const performanceTask =
        filter.catOnly !== true || filter.performanceOnly === true;
      results = results.filter(i => i.isPerformanceItem === performanceTask);
    }

    //targets
    if (filter.targets && filter.targets.length > 0) {
      results = results.filter(
        i => filter.targets!.findIndex(t => t === i.targetHash) !== -1
      );
    }

    return results;
  }
}
