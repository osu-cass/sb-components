import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
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
  targetCodes?: Number[];
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
  let selectedSubjectCodes: string[] = [];

  const subjectCategory = currentCategories
    .find(c => c.code.toLowerCase() === 'subject'); // find subjects category

  if(subjectCategory){
    selectedSubjectCodes = subjectCategory.filterOptions.filter(f => f.isSelected) // filter out all non selected subjects
    .map(f => f.key); // grab keys from selected subjects
  }

  const currentClaimCodes = model.subjects
    .filter(s => selectedSubjectCodes.some(ssc => ssc.toLowerCase() === s.code.toLowerCase()))//currently selected subjects
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

  const claimsFilter = currentCategories.find(f => f.code.toLowerCase() === 'claims');
  claimsFilter ? claimsFilter.filterOptions = claimFilterOptions : [];

  return claimsFilter;
}

export function getCurrentTargets(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
  let selectedClaimCodes:string[] = [];

  const claimCategory = currentCategories
    .find(c => c.code.toLowerCase() === 'claims') // find subjects category
    
  if(claimCategory){
    selectedClaimCodes =  claimCategory.filterOptions.filter(f => f.isSelected) // filter out all non selected subjects
    .map(f => f.key); // grab keys from selected subjects
  }

  const currentTargetCodes = model.claims
    .filter(s => selectedClaimCodes.some(ssc => ssc.toLowerCase() === s.code.toLowerCase()))//currently selected subjects
    .map(s => s.targetCodes ? s.targetCodes : [])// grab all lists of targetcodes
    .reduce((pc, cc) =>  pc.concat(cc), []);//flatten targetcodes

  const targetFilterOptions = model.targets
    .filter(f => currentTargetCodes.some(t => t === f.nameHash))
    .map(m => {
      return {
        label:m.name,
        key:String(m.nameHash),
        isSelected:false
      } as FilterOptionModel;
    });

  const targetsFilter = currentCategories.find(f => f.code.toLowerCase() === 'targets');
  targetsFilter ? targetsFilter.filterOptions = targetFilterOptions : [];

  return targetsFilter;
}

export function getCurrentInteractionTypes(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
  let selectedSubjectCodes:string[] = [];

  const selectedCategory = currentCategories
    .find(c => c.code.toLowerCase() === 'subject') // find subjects category

  if (selectedCategory){
    selectedSubjectCodes = selectedCategory.filterOptions.filter(f => f.isSelected) // filter out all non selected subjects
    .map(f => f.key); // grab keys from selected subjects
  }

  const currentInteractionTypeCodes = model.subjects
    .filter(s => selectedSubjectCodes.some(ssc => ssc.toLowerCase() === s.code.toLowerCase()))//currently selected subjects
    .map(s => s.interactionTypeCodes ? s.interactionTypeCodes : [])// grab all lists of claims
    .reduce((pc, cc) =>  pc.concat(cc), []);//flatten claims

  const interactionFilterOptions = model.interactionTypes
    .filter(f => currentInteractionTypeCodes.some(i => i.toLowerCase() === f.code.toLowerCase()))
    .map(m => {
      return {
        label:m.label,
        key:m.code,
        isSelected:false
      } as FilterOptionModel;
    });

  const interactionTypeFilter = currentCategories.find(f => f.code.toLowerCase() === 'interactiontype');
  interactionTypeFilter ? interactionTypeFilter.filterOptions = interactionFilterOptions : [];

  return interactionTypeFilter;
}
