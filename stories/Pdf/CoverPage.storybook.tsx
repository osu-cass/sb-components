import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { CoverPage } from "src/index";
import "src/Assets/Styles/pdf.less";

storiesOf("PDF CoverPage", module)
  .addDecorator(PdfDecorator)
  .add("Cover Page", () => (
    <CoverPage
      subject="Mathematics"
      grade="High School"
      dateString="10/27/2017"
    />
  ));
