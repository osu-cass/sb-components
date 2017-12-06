import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AdvFilTestWrapper } from "../AdvFilTestWrappers";
import {
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
    <AdvFilTestWrapper filterCat={advancedFilterSubject} />
  ))
  .add("multi select", () => (
    <AdvFilTestWrapper
      filterCat={advancedFilterSubjectMulti}
      filterOptions={subjectsFilterOptionsSelected}
    />
  ))
  .add("multi select all ", () => (
    <AdvFilTestWrapper filterCat={advancedFilterSubjectMultiAll} />
  ))
  .add("multi select all selected ", () => (
    <AdvFilTestWrapper
      filterCat={advancedFilterSubjectMultiAll}
      filterOptions={subjectsFilterOptionsSelected}
    />
  ))
  .add("disabled", () => (
    <AdvFilTestWrapper filterCat={advancedFilterSubjectDisabled} />
  ))
  .add("disabled with selections", () => (
    <AdvFilTestWrapper
      filterCat={advancedFilterSubjectDisabled}
      filterOptions={subjectsFilterOptionsSelected}
    />
  ))
  .add("disabled multi", () => (
    <AdvFilTestWrapper filterCat={advancedFilterSubjectDisabledMulti} />
  ))
  .add("disabled multi all", () => (
    <AdvFilTestWrapper filterCat={advancedFilterSubjectMultiAllDisabled} />
  ))
  .add("no options", () => (
    <AdvFilTestWrapper filterCat={advancedFilterSubject} filterOptions={[]} />
  ));
