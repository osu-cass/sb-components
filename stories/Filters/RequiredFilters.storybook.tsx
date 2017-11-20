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
  action("clicked")
  const newClaimsFilter = getCurrentClaimsFilter(mockItemsSearchModel,advFilCategorys);
  console.log(newClaimsFilter);
}

const props: AdvancedFilterContainerProps = {
  filterOptions: [advancedFilterGrade,advancedFilterSubject],
  onClick: onClickHandler
};

storiesOf("RequiredFilters", module).add("normal render", () => (
  <AdvancedFilterContainer {...props} />
));
