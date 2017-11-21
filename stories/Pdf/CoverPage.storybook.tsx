import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { CoverPage } from "../../src/Pdf/CoverPage";

storiesOf("PDF Cover Page", module)
  .addDecorator(PdfDecorator)
  .add("Cover Page", () => (
    <CoverPage subject="Mathematics" grade="High School" />
  ));
