import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RouterDecorator } from "../RouterDecorator";
import { AboutItem } from "../../src";
import { AboutItemMockModel, rubrics, rubricsEsn, allRubrics } from "./mocks";

storiesOf("About Item Modal", module)
.addDecorator(RouterDecorator)
  .add("default", () => <AboutItem {...AboutItemMockModel} />)
  .add("showing no rubrics", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} />
  ))
  .add("showing rubrics", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} rubrics={rubrics} />
  ))
  .add("showing rubrics ESN", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} rubrics={rubricsEsn} />
  ))
  .add("showing rubrics ENU ESN", () => (
    <AboutItem {...AboutItemMockModel} showModal={true} rubrics={allRubrics} />
  ));
