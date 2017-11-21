import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { RubricTable } from "../../src/Rubric/RubricTable";
import { rubric, rubricNoSamples } from "./Mocks";

storiesOf("PDF Rubric Table", module)
  .addDecorator(PdfDecorator)
  .add("Rubric Table", () => <RubricTable rubrics={[rubric]} />)
  .add("Rubric Table: no Samples", () => (
    <RubricTable rubrics={[rubricNoSamples]} />
  ))
  .add("Rubric Table: multiple", () => (
    <RubricTable rubrics={[rubric, rubricNoSamples]} />
  ));
