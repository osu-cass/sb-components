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

import { 
  getCurrentClaimsFilter,
  getCurrentInteractionTypes } from "../../src/ItemSearch/ItemSearchModels";//add theses into index.d.ts
import { 
  advancedFilterGrade,
  advancedFilterSubject,
  mockItemsSearchModel
} from "./mocks";



function onClickHandlerClaim(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = getCurrentClaimsFilter(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
}

function onClickHandlerInteractionTypes(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = getCurrentInteractionTypes(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
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

const AdvancedFilterInteractionTypes:AdvancedFilterCategoryModel = {
  disabled:false,
  isMultiSelect:true,
  label:"interaction type",
  code:"interactiontype",
  displayAllButton:true,
  filterOptions:[],
  helpText:"Claims help text here."
}



const claimProps: AdvancedFilterContainerProps = {
  filterOptions: [advancedFilterGrade,advancedFilterSubject,AdvancedFilterClaims],
  onClick: onClickHandlerClaim
};

const interactionTypeProps:AdvancedFilterContainerProps = {
  filterOptions:[advancedFilterGrade,advancedFilterSubject,AdvancedFilterInteractionTypes],
  onClick: onClickHandlerInteractionTypes
}

storiesOf("RequiredFilters", module).add("claims filter", () => (
  <AdvancedFilterContainer {...claimProps} />
)).add("interactionType filter", () => (
  <AdvancedFilterContainer {...interactionTypeProps} />
))


