import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action, decorateAction } from "@storybook/addon-actions";
import {
  AdvancedFilterContainer,
  AdvancedFilterContainerProps,
  FilterOptionModel,
  OptionTypeModel,
  AdvancedFilterCategoryModel
} from "../../src";

import { ItemSearch } from "../../src/ItemSearch/ItemSearch";//add theses into index.d.ts
import { 
  advancedFilterGrade,
  advancedFilterSubject,
  mockItemsSearchModel,
  emptyAdvancedFilterClaims,
  FilledAdvancedFilterClaims,
  emptyAdvancedFilterInteractionTypes,
  emptyAdvancedFilterTargets
} from "./mocks";

const claimHandler = decorateAction([
  args => {
    ItemSearch.getCurrentClaimsFilter(mockItemsSearchModel, args)
  }
])

function onClickHandlerClaim(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = ItemSearch.getCurrentClaimsFilter(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
}

function onClickHandlerInteractionTypes(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = ItemSearch.getCurrentInteractionTypes(mockItemsSearchModel,advFilCategorys);
  console.log(newFilter);
}

function onClickHandlerTarget(advFilCategorys:AdvancedFilterCategoryModel[]){
  const newFilter = ItemSearch.getCurrentTargets(mockItemsSearchModel,advFilCategorys);
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


