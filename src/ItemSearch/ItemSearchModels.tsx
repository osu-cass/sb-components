import { GradeLevels, gradeLevelContains } from "../GradeLevels/GradeLevels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";

export interface SubjectClaimsModel {
  [subject: string]: { text: string; value: string }[];
}

export interface SubjectModel {
  code: string;
  label: string;
  claims?: ClaimModel[];
  claimCodes?: string[];
  interactionTypeCodes?: string[];
}

export interface ClaimModel {
  code: string;
  label: string;
  targets?: TargetModel[];
  targetCodes?: string[];
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

//TODO: add claims, targets 
export interface ItemsSearchModel {
  interactionTypes: InteractionTypeModel[];
  subjects: SubjectModel[];
  claims: ClaimModel[];
  targets: TargetModel[];
}

//add function to filter itemtypes, claims, targets
export function getCurrentItemTypes(itemCards: ItemCardModel){
  
}

export function filterItemCards(
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
      gradeLevelContains(i.grade, filter.gradeLevels || GradeLevels.NA)
    );
  }

  //subjects
  if (filter.subjects && filter.subjects.length > 0) {
    results = results.filter(i =>
      (filter.subjects || []).findIndex(s => s === i.subjectCode)
    );
  }

  //interaction types
  if (filter.interactionTypes && filter.interactionTypes.length > 0) {
    results = results.filter(i =>
      (filter.interactionTypes || []).findIndex(
        it => it === i.interactionTypeCode
      )
    );
  }

  //claims
  if (filter.claims && filter.claims.length > 0) {
    results = results.filter(i =>
      (filter.claims || []).findIndex(c => c === i.claimCode)
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
    results = results.filter(i =>
      (filter.targets || []).findIndex(t => t === i.targetHash)
    );
  }

  return results; ///TODO: add sort
}
