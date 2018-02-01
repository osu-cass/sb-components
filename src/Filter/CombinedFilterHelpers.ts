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
