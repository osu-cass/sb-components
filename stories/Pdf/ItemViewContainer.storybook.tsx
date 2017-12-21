import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PdfDecorator } from "../PdfDecorator";
import { ItemViewContainer } from "src/index";
import {
  singleQuestion,
  passageAndQuestion,
  multipleQuestions
} from "mocks/Pdf/mocks";

storiesOf("PDF ItemViewContainer", module)
  .addDecorator(PdfDecorator)
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
