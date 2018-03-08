import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemViewContainer } from "../ItemViewContainer";
import { shallow, mount, render } from "enzyme";
import { itemGroup } from "./PdfMocks";

describe("EvidenceStatement", () => {
  it("matches snapshot score", () => {
    expect(
      shallow(
        <ItemViewContainer itemData={itemGroup} displayScoreInfo={true} />
      )
    ).toMatchSnapshot();
  });
  it("matches snapshot no score", () => {
    expect(
      shallow(
        <ItemViewContainer itemData={itemGroup} displayScoreInfo={false} />
      )
    ).toMatchSnapshot();
  });
});
