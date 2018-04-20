import { FilterCategoryModel, FilterOptionModel, FilterType } from "../Filter/FilterModels";
import { ItemsSearchModel, SearchAPIParamsModel, SearchFilterStringTypes, TargetModel, SearchFilterModelTypes, ClaimModel } from "../ItemSearch/ItemSearchModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { GradeLevels } from "../GradeLevels/GradeLevels";
export declare class ItemSearch {
    static filterToSearchApiModel(filterModels: FilterCategoryModel[]): SearchAPIParamsModel;
    /**
     * Takes a `SearchAPIParamsModel` and the filter category that has been updated,
     * and updates the search params model accordingly, returning a copy of it with
     * the updated param added/removed.
     *
     * @param {FilterCategoryModel} category
     * @param {SearchAPIParamsModel} currentModel
     */
    static updateSearchApiModel(category: FilterCategoryModel, currentModel: SearchAPIParamsModel): SearchAPIParamsModel;
    /**
     * Takes a `SearchAPIParamsModel` and modifies it in place, removing the
     * dependent params whose parents are no longer visible to the user.
     *
     * @param {SearchAPIParamsModel} searchParams
     * @param {ItemsSearchModel} model
     */
    static updateDependentSearchParams(searchParams: SearchAPIParamsModel, model: ItemsSearchModel): SearchAPIParamsModel;
    static searchOptionFilterString(options: SearchFilterStringTypes[], filterType: FilterType, selectedCodes?: string[]): FilterOptionModel[];
    static searchOptionToFilterGrade(options: GradeLevels[], filterType: FilterType, selectedCode?: GradeLevels): FilterOptionModel[];
    static searchOptionToFilterTarget(options: TargetModel[], filterType: FilterType, selectedCodes?: string[]): FilterOptionModel[];
    static searchOptionToFilterClaim(options: ClaimModel[], filterType: FilterType, selectedCodes?: string[]): FilterOptionModel[];
    static getFilterOptionModel(filter: SearchFilterModelTypes, searchApi?: SearchAPIParamsModel): FilterOptionModel[];
    static getTechnologyTypeCodes(search: SearchAPIParamsModel): string[];
    static getFlagCodes(searchFlag?: boolean): string[];
    static filterSearchToCategory(filter: SearchFilterModelTypes, searchApi?: SearchAPIParamsModel): FilterCategoryModel;
    static filterItemCards(itemCards: ItemCardModel[], filter: SearchAPIParamsModel): ItemCardModel[];
}
