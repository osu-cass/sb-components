import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { RubricTable } from "src/index";
import {
  rubrics,
  rubricsWithSamples,
  rubricsEsn,
  allRubrics
} from "mocks/AboutItem/mocks";
import "src/Assets/Styles/pdf.less";

storiesOf("PDF RubricTable", module)
  .addDecorator(PdfDecorator)
  .add("Rubric Table", () => <RubricTable rubrics={rubricsWithSamples} />)
  .add("Rubric Table: no Samples", () => <RubricTable rubrics={rubrics} />)
  .add("Rubric Table: multiple", () => <RubricTable rubrics={allRubrics} />)
  .add("Rubric Table: ESN", () => <RubricTable rubrics={rubricsEsn} />);
