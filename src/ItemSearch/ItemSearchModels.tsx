import { GradeLevels, gradeLevelContains } from "../GradeLevels/GradeLevels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { AdvancedFilterCategoryModel, FilterOptionModel } from "../Filter/AdvancedFilterModel";

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


export interface ItemsSearchModel {
  interactionTypes: InteractionTypeModel[];
  subjects: SubjectModel[];
  claims: ClaimModel[];
  targets: TargetModel[];
}

//add function to filter itemtypes, claims, targets
export function getCurrentClaimsFilter(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
  const selectedSubjectCodes = currentCategories
    .find(c => c.code.toLowerCase() === 'subject') // find subjects category
    .filterOptions.filter(f => f.isSelected) // filter out all non selected subjects
    .map(f => f.key); // grab keys from selected subjects

  const currentClaimCodes = model.subjects
    .filter(s => selectedSubjectCodes.some(ssc => ssc === s.code))//currently selected subjects
    .map(s => s.claimCodes ? s.claimCodes : [])// grab all lists of claims
    .reduce((pc, cc) =>  pc.concat(cc), []);//flatten claims


  const claimFilterOptions = model.claims
    .filter(f => currentClaimCodes.some(c => c === f.code))
    .map(m => {
      return {
        label:m.label,
        key:m.code,
        isSelected:false //this will have some conflicts with current selection
      } as FilterOptionModel;
    });

  const claimsFilter = currentCategories.find(f => f.code === 'claim');
  claimsFilter.filterOptions = claimFilterOptions;
  return claimsFilter;
}

export function getCurrentTargets(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
  const selectedClaimCodes = currentCategories
    .find(c => c.code.toLowerCase() === 'claim') // find subjects category
    .filterOptions.filter(f => f.isSelected) // filter out all non selected subjects
    .map(f => f.key); // grab keys from selected subjects

  const currentTargetCodes = model.claims
    .filter(s => selectedClaimCodes.some(ssc => ssc === s.code))//currently selected subjects
    .map(s => s.targetCodes ? s.targetCodes : [])// grab all lists of targetcodes
    .reduce((pc, cc) =>  pc.concat(cc), []);//flatten targetcodes

  const targetFilterOptions = model.targets
    .filter(f => currentTargetCodes.some(t => t=== f.name))
    .map(m => {
      return {
        label:m.name,
        key:String(m.nameHash),
        isSelected:false
      } as FilterOptionModel;
    });

  return currentTargetCodes;// TODO: return targets filter
}

export function getCurrentInteractionTypes(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
  const selectedSubjectCodes = currentCategories
    .find(c => c.code.toLowerCase() === 'subject') // find subjects category
    .filterOptions.filter(f => f.isSelected) // filter out all non selected subjects
    .map(f => f.key); // grab keys from selected subjects

  const currentInteractionTypeCodes = model.subjects
    .filter(s => selectedSubjectCodes.some(ssc => ssc === s.code))//currently selected subjects
    .map(s => s.interactionTypeCodes ? s.interactionTypeCodes : [])// grab all lists of claims
    .reduce((pc, cc) =>  pc.concat(cc), []);//flatten claims

  return currentInteractionTypeCodes; // TODO: return interactionTypes filter
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
