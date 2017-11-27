import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { RubricTable } from "../../src/Rubric/RubricTable";
import { rubrics, rubricNoSamples, allRubrics } from "../AboutItem/mocks";

storiesOf("PDF RubricTable", module)
  .addDecorator(PdfDecorator)
  .add("Rubric Table", () => <RubricTable rubrics={rubrics} />)
  .add("Rubric Table: no Samples", () => (
    <RubricTable rubrics={rubricNoSamples} />
  ))
  .add("Rubric Table: multiple", () => (
    <RubricTable rubrics={allRubrics} />
  ));
