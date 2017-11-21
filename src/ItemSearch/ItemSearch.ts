import { SearchAPIParamsModel } from "./ItemSearchModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import { FilterCategoryModel } from "../Filter/AdvancedFilterModel";

export class ItemSearch {
  public static parseAdvancedFilter(
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

  public static advancedFilterToSearch(
    filterModels: FilterCategoryModel[]
  ): SearchAPIParamsModel {
    const dictionary = this.parseAdvancedFilter(filterModels);

    const subjects = dictionary["Subject"] || [];
    const gradeString = (dictionary["Grade"] || [])[0]; //TODO: This is an array of grades, could use bitwise
    const gradeLevels = GradeLevel.stringToGradeLevel(gradeString);
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

    return results; ///TODO: add sort
  }
}
