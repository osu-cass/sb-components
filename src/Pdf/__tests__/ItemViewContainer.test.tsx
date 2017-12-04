import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemViewContainer } from "../ItemViewContainer";
import { shallow, mount, render } from "enzyme";
import { itemGroup } from "./PdfMocks";

describe("EvidenceStatement", () => {
  it("matches snapshot", () => {
    expect(
      shallow(<ItemViewContainer itemData={itemGroup} />)
    ).toMatchSnapshot();
  });
});
