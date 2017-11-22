import { SearchAPIParamsModel, ItemsSearchModel } from "../ItemSearch/ItemSearchModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import { FilterCategoryModel, FilterOptionModel, AdvancedFilterCategoryModel } from "../Filter/AdvancedFilterModel";

export class Filter {

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

    //add function to filter itemtypes, claims, targets
    public static getCurrentClaimsFilter(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
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

    public static getCurrentTargets(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
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

    public static getCurrentInteractionTypes(model: ItemsSearchModel, currentCategories:AdvancedFilterCategoryModel[]){
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

}