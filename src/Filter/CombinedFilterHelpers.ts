import {
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterType
} from "./FilterModels";
import {
  SearchAPIParamsModel,
  ItemsSearchModel
} from "../ItemSearch/ItemSearchModels";
import { Filter } from "../Filter/Filter";
import { ItemSearch } from "../ItemSearch/ItemSearch";

export interface BothFilterModels {
  searchAPI: SearchAPIParamsModel;
  basicFilter: BasicFilterCategoryModel[];
  advancedFilter?: AdvancedFilterCategoryModel[];
}

/**
 * Performs calls to update `SearchAPIParamsModel`, `BasicFilterCategoryModel`s, and
 * `AdvancedFilterCategoryModel`s based on changes to a the advanced filter, then returns
 * the updated models in an object
 *
 * @param {BasicFilterCategoryModel[]} basicFilter
 * @param {SearchAPIParamsModel} searchAPI
 * @param {AdvancedFilterCategoryModel[]} [advancedFilter]
 * @param {ItemsSearchModel} [searchModel]
 * @param {FilterType} [changed]
 */
export function advancedFilterUpdated(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  advancedFilter?: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel,
  changed?: FilterType
): BothFilterModels {
  if (!advancedFilter) {
    return { searchAPI, advancedFilter, basicFilter };
  }

  if (changed) {
    const changedBasicFilter = basicFilter.find(f => f.code === changed);
    const changedAdvancedFilter = advancedFilter.find(f => f.code === changed);

    if (changedAdvancedFilter) {
      //add or remove changed advanced filter item to search params
      searchAPI = ItemSearch.updateSearchApiModel(
        changedAdvancedFilter,
        searchAPI
      );
      if (changedBasicFilter) {
        //update corresponding basic filter category
        Filter.updateSingleFilter(changedBasicFilter, changedAdvancedFilter);
      }
    }
  }

  //show/hide calculator if math selected
  Filter.hideFiltersBasedOnSearchParams(advancedFilter, searchAPI);

  if (searchModel) {
    //remove any searchAPI params that aren't visible anymore
    searchAPI = ItemSearch.updateDependentSearchParams(searchAPI, searchModel);
    //update advanced filter based on changes to searchAPIparams
    advancedFilter = Filter.getUpdatedSearchFilters(
      searchModel,
      advancedFilter,
      searchAPI
    );
  }

  return { searchAPI, basicFilter, advancedFilter };
}

/**
 * Performs calls to update `SearchAPIParamsModel`, `BasicFilterCategoryModel`s, and
 * `AdvancedFilterCategoryModel`s based on changes to a the basic filter, then returns
 * the updated models in an object
 *
 * @param {BasicFilterCategoryModel[]} basicFilter
 * @param {SearchAPIParamsModel} searchAPI
 * @param {AdvancedFilterCategoryModel[]} [advancedFilter]
 * @param {ItemsSearchModel} [searchModel]
 * @param {FilterType} [changed]
 */
export function basicFilterUpdated(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  advancedFilter: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel,
  changed?: FilterType
): BothFilterModels {
  const changedBasicFilter = basicFilter.find(f => f.code === changed);
  const changedAdvancedFilter = advancedFilter.find(f => f.code === changed);

  if (changedBasicFilter) {
    //update search API based on changes to basic filter
    searchAPI = ItemSearch.updateSearchApiModel(changedBasicFilter, searchAPI);
    if (changedAdvancedFilter) {
      //update corresponding advanced filter category
      Filter.updateSingleFilter(changedAdvancedFilter, changedBasicFilter);
    }
  }

  //show/hide calculator if math selected
  Filter.hideFiltersBasedOnSearchParams(advancedFilter, searchAPI);

  if (searchModel) {
    //remove any searchAPI params that aren't visible anymore
    searchAPI = ItemSearch.updateDependentSearchParams(searchAPI, searchModel);
    //update advanced filter based on changes to searchAPIparams
    advancedFilter = Filter.getUpdatedSearchFilters(
      searchModel,
      advancedFilter,
      searchAPI
    );
  }

  return { searchAPI, basicFilter, advancedFilter };
}

/**
 * Marks each option on each basic and advanced filter as not selected, then returns the two in an object
 * along with an empty `SearchAPIParamsModel`
 *
 * @param {BasicFilterCategoryModel[]} basicFilter
 * @param {AdvancedFilterCategoryModel[]} [advancedFilter]
 */
export function resetFilters(
  basicFilter: BasicFilterCategoryModel[],
  advancedFilter?: AdvancedFilterCategoryModel[]
): BothFilterModels {
  if (advancedFilter) {
    advancedFilter.forEach(f =>
      f.filterOptions.forEach(o => (o.isSelected = false))
    );
  }
  basicFilter.forEach(f =>
    f.filterOptions.forEach(o => (o.isSelected = false))
  );
  return { advancedFilter, basicFilter, searchAPI: {} };
}
