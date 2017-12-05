import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AdvancedFilter } from "../../src";
import {
  selectedHandler,
  advancedFilterSubject,
  advancedFilterSubjectMulti,
  advancedFilterSubjectDisabled,
  advancedFilterSubjectDisabledMulti,
  advancedFilterSubjectMultiAll,
  advancedFilterSubjectMultiAllDisabled,
  subjectsFilterOptionsSelected
} from "./mocks";
import { CenterDecorator } from "../CenterDecorator";

//Advanced filter select actions won't persist, stories should be checking the rendering and not actions
storiesOf("Advanced Filter", module)
  .addDecorator(CenterDecorator)
  .add("single select", () => (
    <AdvancedFilter
      {...advancedFilterSubject}
      onFilterOptionSelect={selectedHandler}
    />
  ))
  .add("multi select", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMulti}
      onFilterOptionSelect={selectedHandler}
      filterOptions={subjectsFilterOptionsSelected}
    />
  ))
  .add("multi select all ", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMultiAll}
      onFilterOptionSelect={selectedHandler}
    />
  ))
  .add("multi select all selected ", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMultiAll}
      onFilterOptionSelect={selectedHandler}
      filterOptions={subjectsFilterOptionsSelected}
    />
  ))
  .add("disabled", () => (
    <AdvancedFilter
      {...advancedFilterSubjectDisabled}
      onFilterOptionSelect={selectedHandler}
    />
  ))
  .add("disabled with selections", () => (
    <AdvancedFilter
      {...advancedFilterSubjectDisabled}
      onFilterOptionSelect={selectedHandler}
      filterOptions={subjectsFilterOptionsSelected}
    />
  ))
  .add("disabled multi", () => (
    <AdvancedFilter
      {...advancedFilterSubjectDisabledMulti}
      onFilterOptionSelect={selectedHandler}
    />
  ))
  .add("disabled multi all", () => (
    <AdvancedFilter
      {...advancedFilterSubjectMultiAllDisabled}
      onFilterOptionSelect={selectedHandler}
    />
  ))
  .add("no options", () => (
    <AdvancedFilter
      {...advancedFilterSubject}
      onFilterOptionSelect={selectedHandler}
      filterOptions={[]}
    />
  ));
