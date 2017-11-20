import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  AdvancedFilterContainer,
  AdvancedFilterContainerProps,
  FilterOptionModel,
  OptionTypeModel,
  AdvancedFilterCategoryModel
} from "../../src";

import { getCurrentClaimsFilter } from "../../src/ItemSearch/ItemSearchModels";//add theses into index.d.ts
import { 
  advancedFilterGrade,
  advancedFilterSubject,
  mockItemsSearchModel
} from "./mocks";



function onClickHandler(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newClaimsFilter = getCurrentClaimsFilter(mockItemsSearchModel,advFilCategorys);
  console.log(newClaimsFilter);
}

const AdvancedFilterClaims:AdvancedFilterCategoryModel = {
  disabled:false,
  isMultiSelect:true,
  label:"Claims",
  code:"Claims",
  displayAllButton:true,
  filterOptions:[],
  helpText:"Claims help text here."
}

const props: AdvancedFilterContainerProps = {
  filterOptions: [advancedFilterGrade,advancedFilterSubject,AdvancedFilterClaims],
  onClick: onClickHandler
};

storiesOf("RequiredFilters", module).add("normal render", () => (
  <AdvancedFilterContainer {...props} />
));
