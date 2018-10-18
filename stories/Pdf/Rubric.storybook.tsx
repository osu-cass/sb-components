import * as React from "react";
import { storiesOf } from "@storybook/react";
import { pdfDecorator } from "../PdfDecorator";
import { RubricTable } from "@src/index";
import {
  mockRubrics,
  rubricsWithSamples,
  rubricsEsn,
  allRubrics
} from "@mocks/AboutItem/mocks";
import "src/Assets/Styles/pdf.less";

storiesOf("PDF RubricTable DontTest", module)
  .addDecorator(pdfDecorator)
  .add("Rubric Table", () => <RubricTable rubrics={rubricsWithSamples} />)
  .add("Rubric Table: no Samples", () => <RubricTable rubrics={mockRubrics} />)
  .add("Rubric Table: multiple", () => <RubricTable rubrics={allRubrics} />)
  .add("Rubric Table: ESN", () => <RubricTable rubrics={rubricsEsn} />);
