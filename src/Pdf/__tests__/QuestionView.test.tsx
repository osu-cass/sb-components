import * as React from "react";
import * as ReactDOM from "react-dom";
import { QuestionView } from "../QuestionView";
import { shallow, mount, render } from "enzyme";
import { questionDataNull } from "./PdfMocks";

describe("QuestionDataTable", () => {
  it("matches snapshot", () => {
    expect(
      shallow(
        <QuestionView question={questionDataNull} displayScoreInfo={true} />
      )
    ).toMatchSnapshot();
  });
});
