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

export function siwFilterUpdated(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  searchModel?: ItemsSearchModel,
  changedFilter?: FilterType
): BothFilterModels {
  let newSearchAPI = { ...searchAPI };
  if (changedFilter) {
    const changedBasicFilter = basicFilter.find(f => f.code === changedFilter);
    if (changedBasicFilter) {
      newSearchAPI = ItemSearch.updateSearchApiModel(
        changedBasicFilter,
        newSearchAPI
      );
    }
  }

  return siwUpdateDependentAndSearch(
    basicFilter,
    newSearchAPI,
    [],
    searchModel
  );
}

function siwUpdateDependentAndSearch(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  advancedFilter: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel
): BothFilterModels {
  let newFilter = basicFilter.slice();
  let newSearchAPI = { ...searchAPI };

  // show/hide calculator if math selected
  Filter.hideFiltersBasedOnSearchParams(newFilter, newSearchAPI);

  if (searchModel) {
    // remove any searchAPI params that aren't visible anymore
    newSearchAPI = ItemSearch.updateDependentSearchParams(
      newSearchAPI,
      searchModel
    );
    // update filter based on changes to searchAPIparams
    newFilter = Filter.getUpdatedSearchFilters(
      searchModel,
      newFilter,
      newSearchAPI
    );
  }

  return { advancedFilter, basicFilter: newFilter, searchAPI: newSearchAPI };
}

/**
 * Performs calls to update `SearchAPIParamsModel`, `BasicFilterCategoryModel`s, and
 * `AdvancedFilterCategoryModel`s based on changes to a the advanced filter, then returns
 * the updated models in an object
 */
export function advancedFilterUpdated(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  advancedFilter?: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel,
  changedFilter?: FilterType
): BothFilterModels {
  const newAdvFilter = (advancedFilter || []).slice();
  let newSearchAPI = { ...searchAPI };
  if (changedFilter) {
    const changedBasicFilter = basicFilter.find(f => f.code === changedFilter);
    const changedAdvancedFilter = newAdvFilter.find(
      f => f.code === changedFilter
    );
    if (changedAdvancedFilter) {
      // add or remove changed advanced filter item to search params
      newSearchAPI = ItemSearch.updateSearchApiModel(
        changedAdvancedFilter,
        newSearchAPI
      );
      if (changedBasicFilter) {
        // update corresponding basic filter category
        Filter.updateSingleFilter(changedBasicFilter, changedAdvancedFilter);
      }
    }
  }

  return updateDependentAndSearch(
    basicFilter,
    newSearchAPI,
    newAdvFilter,
    searchModel
  );
}

function updateDependentAndSearch(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  advancedFilter: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel
): BothFilterModels {
  let newAdvFilter = advancedFilter.slice();
  let newSearchAPI = { ...searchAPI };

  // show/hide calculator if math selected
  Filter.hideFiltersBasedOnSearchParams(newAdvFilter, newSearchAPI);

  if (searchModel) {
    // remove any searchAPI params that aren't visible anymore
    newSearchAPI = ItemSearch.updateDependentSearchParams(
      newSearchAPI,
      searchModel
    );
    // update advanced filter based on changes to searchAPIparams
    newAdvFilter = Filter.getUpdatedSearchFilters(
      searchModel,
      newAdvFilter,
      newSearchAPI
    );
  }

  return { basicFilter, advancedFilter: newAdvFilter, searchAPI: newSearchAPI };
}

/**
 * Performs calls to update `SearchAPIParamsModel`, `BasicFilterCategoryModel`s, and
 * `AdvancedFilterCategoryModel`s based on changes to a the basic filter, then returns
 * the updated models in an object
 */
export function basicFilterUpdated(
  basicFilter: BasicFilterCategoryModel[],
  searchAPI: SearchAPIParamsModel,
  advancedFilter: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel,
  changed?: FilterType
): BothFilterModels {
  const newAdvFilter = advancedFilter.slice();
  let newSearchAPI = { ...searchAPI };
  const changedBasicFilter = basicFilter.find(f => f.code === changed);
  const changedAdvancedFilter = newAdvFilter.find(f => f.code === changed);

  if (changedBasicFilter) {
    // update search API based on changes to basic filter
    newSearchAPI = ItemSearch.updateSearchApiModel(
      changedBasicFilter,
      newSearchAPI
    );
    if (changedAdvancedFilter) {
      // update corresponding advanced filter category
      Filter.updateSingleFilter(changedAdvancedFilter, changedBasicFilter);
    }
  }

  return updateDependentAndSearch(
    basicFilter,
    newSearchAPI,
    newAdvFilter,
    searchModel
  );
}

/**
 * Marks each option on each basic and advanced filter as not selected, then returns the two in an object
 * along with an empty `SearchAPIParamsModel`
 */
export function resetFilters(
  basicFilter: BasicFilterCategoryModel[],
  advancedFilter?: AdvancedFilterCategoryModel[],
  searchModel?: ItemsSearchModel
): BothFilterModels {
  if (advancedFilter) {
    advancedFilter.forEach(f =>
      f.filterOptions.forEach(o => (o.isSelected = false))
    );
  }
  basicFilter.forEach(f =>
    f.filterOptions.forEach(o => (o.isSelected = false))
  );

  return updateDependentAndSearch(
    basicFilter,
    {},
    advancedFilter || [],
    searchModel
  );
}
