import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AdvancedFilter } from "@src/index";
import {
  advancedFilterSubject,
  advancedFilterSubjectMulti,
  advancedFilterSubjectDisabled,
  advancedFilterSubjectDisabledMulti,
  advancedFilterSubjectMultiAll,
  advancedFilterSubjectMultiAllDisabled,
  subjectsFilterOptionsSelected
} from "@mocks/Filter/mocks";
import { centerDecorator } from "../CenterDecorator";

const action = () => {
  return;
};
storiesOf("Advanced Filter", module)
  .addDecorator(centerDecorator)
  .add("single select", () => (
    <AdvancedFilter {...advancedFilterSubject} onFilterOptionSelect={action} />
  ))
  .add("multi select", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMulti}
      filterOptions={subjectsFilterOptionsSelected}
      onFilterOptionSelect={action}
    />
  ))
  .add("multi select all ", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMultiAll}
      onFilterOptionSelect={action}
    />
  ))
  .add("multi select all selected ", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMultiAll}
      filterOptions={subjectsFilterOptionsSelected}
      onFilterOptionSelect={action}
    />
  ))
  .add("disabled", () => (
    <AdvancedFilter
      {...advancedFilterSubjectDisabled}
      onFilterOptionSelect={action}
    />
  ))
  .add("disabled with selections", () => (
    <AdvancedFilter
      {...advancedFilterSubjectDisabled}
      filterOptions={subjectsFilterOptionsSelected}
      onFilterOptionSelect={action}
    />
  ))
  .add("disabled multi", () => (
    <AdvancedFilter
      {...advancedFilterSubjectDisabledMulti}
      onFilterOptionSelect={action}
    />
  ))
  .add("disabled multi all", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMultiAllDisabled}
      onFilterOptionSelect={action}
    />
  ))
  .add("no options", () => (
    <AdvancedFilter
      {...advancedFilterSubject}
      filterOptions={[]}
      onFilterOptionSelect={action}
    />
  ));
