import { AdvancedFilterCategoryModel, BasicFilterCategoryModel, FilterType } from "./FilterModels";
import { SearchAPIParamsModel, ItemsSearchModel } from "../ItemSearch/ItemSearchModels";
export interface BothFilterModels {
    searchAPI: SearchAPIParamsModel;
    basicFilter: BasicFilterCategoryModel[];
    advancedFilter?: AdvancedFilterCategoryModel[];
}
export declare function siwFilterUpdated(basicFilter: BasicFilterCategoryModel[], searchAPI: SearchAPIParamsModel, advancedFilter: AdvancedFilterCategoryModel[], searchModel?: ItemsSearchModel, changedFilter?: FilterType): BothFilterModels;
/**
 * Performs calls to update `SearchAPIParamsModel`, `BasicFilterCategoryModel`s, and
 * `AdvancedFilterCategoryModel`s based on changes to a the advanced filter, then returns
 * the updated models in an object
 */
export declare function advancedFilterUpdated(basicFilter: BasicFilterCategoryModel[], searchAPI: SearchAPIParamsModel, advancedFilter?: AdvancedFilterCategoryModel[], searchModel?: ItemsSearchModel, changedFilter?: FilterType): BothFilterModels;
/**
 * Performs calls to update `SearchAPIParamsModel`, `BasicFilterCategoryModel`s, and
 * `AdvancedFilterCategoryModel`s based on changes to a the basic filter, then returns
 * the updated models in an object
 */
export declare function basicFilterUpdated(basicFilter: BasicFilterCategoryModel[], searchAPI: SearchAPIParamsModel, advancedFilter: AdvancedFilterCategoryModel[], searchModel?: ItemsSearchModel, changed?: FilterType): BothFilterModels;
/**
 * Marks each option on each basic and advanced filter as not selected, then returns the two in an object
 * along with an empty `SearchAPIParamsModel`
 */
export declare function resetFilters(basicFilter: BasicFilterCategoryModel[], advancedFilter?: AdvancedFilterCategoryModel[], searchModel?: ItemsSearchModel): BothFilterModels;
