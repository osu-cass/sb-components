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
  getCurrentInteractionTypes,
  getCurrentTargets
} from "../../src/ItemSearch/ItemSearchModels";//add theses into index.d.ts
import { 
  advancedFilterGrade,
  advancedFilterSubject,
  mockItemsSearchModel,
  emptyAdvancedFilterClaims,
  FilledAdvancedFilterClaims,
  emptyAdvancedFilterInteractionTypes,
  emptyAdvancedFilterTargets
} from "./mocks";



function onClickHandlerClaim(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = getCurrentClaimsFilter(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
}

function onClickHandlerInteractionTypes(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = getCurrentInteractionTypes(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
}

function onClickHandlerTarget(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = getCurrentTargets(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
}

const claimProps: AdvancedFilterContainerProps = {
  filterOptions: [advancedFilterGrade,advancedFilterSubject,emptyAdvancedFilterClaims],
  onClick: onClickHandlerClaim
};

const interactionTypeProps:AdvancedFilterContainerProps = {
  filterOptions:[advancedFilterGrade,advancedFilterSubject,emptyAdvancedFilterInteractionTypes],
  onClick: onClickHandlerInteractionTypes
}

const targetProps:AdvancedFilterContainerProps = {
  filterOptions:[advancedFilterGrade,advancedFilterSubject,FilledAdvancedFilterClaims,emptyAdvancedFilterTargets],
  onClick: onClickHandlerTarget
}

storiesOf("RequiredFilters", module).add("Claims filter", () => (
  <AdvancedFilterContainer {...claimProps} />
)).add("Interaction Type filter", () => (
  <AdvancedFilterContainer {...interactionTypeProps} />
)).add("Target filter", () => (
  <AdvancedFilterContainer {...targetProps} />
));


