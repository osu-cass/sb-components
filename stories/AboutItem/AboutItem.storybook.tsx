import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import { AboutItem } from "../../src";
import { AboutItemMockModel, rubrics, rubricsEsn, allRubrics } from "./mocks";

storiesOf("About Item Modal", module)
  .addDecorator(CenterDecorator)
  .add("default", () => <AboutItem {...AboutItemMockModel} />)
  .add("showing no rubrics", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} />
  ))
  .add("showing rubrics", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} rubrics={rubrics} />
  )) //TODO: Add Me
  .add("showing rubrics ESN", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} rubrics={rubricsEsn} />
  )) //TODO: Add Me
  .add("showing rubrics ENU ESN", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} rubrics={allRubrics} />
  )); //TODO: Add Me
