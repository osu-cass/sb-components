import * as React from "react";
import { storiesOf } from "@storybook/react";
import { pdfDecorator } from "../PdfDecorator";
import { ItemViewContainer } from "@src/index";
import {
  singleQuestion,
  passageAndQuestion,
  multipleQuestions
} from "@mocks/Pdf/mocks";
import "src/Assets/Styles/pdf.less";

storiesOf("PDF ItemViewContainer DontTest", module)
  .addDecorator(pdfDecorator)
  .add("question only", () => (
    <ItemViewContainer itemData={singleQuestion} displayScoreInfo={true} />
  ))
  .add("passage and question", () => (
    <ItemViewContainer itemData={passageAndQuestion} displayScoreInfo={true} />
  ))
  .add("multiple questions", () => (
    <ItemViewContainer itemData={multipleQuestions} displayScoreInfo={true} />
  ))
  .add("no score info", () => (
    <ItemViewContainer itemData={singleQuestion} displayScoreInfo={false} />
  ));
