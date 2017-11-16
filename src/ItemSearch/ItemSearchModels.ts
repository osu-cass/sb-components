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
  interactionTypeCodes?: string[];
}

export interface ClaimModel {
  code: string;
  label: string;
  targets: TargetModel[];
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
  interactionTypes: InteractionTypeModel[];
  subjects: SubjectModel[];
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
      gradeLevelContains(filter.gradeLevels || GradeLevels.NA, i.grade)
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
