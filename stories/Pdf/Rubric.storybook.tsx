import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { RubricTable } from "../../src/Rubric/RubricTable";
import { rubric, rubricNoSamples } from "./Mocks";

storiesOf("PDF RubricTable", module)
  .addDecorator(PdfDecorator)
  .add("Rubric Table", () => <RubricTable rubrics={[rubric]} />)
  .add("Rubric Table: no Samples", () => (
    <RubricTable rubrics={[rubricNoSamples]} />
  ))
  .add("Rubric Table: multiple", () => (
    <RubricTable rubrics={[rubric, rubricNoSamples]} />
  ));
