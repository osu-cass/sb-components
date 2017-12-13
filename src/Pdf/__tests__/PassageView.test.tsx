import * as React from "react";
import * as ReactDOM from "react-dom";
import { PassageView } from "../PassageView";
import { shallow, mount, render } from "enzyme";
import { passageViewProps } from "./PdfMocks";

describe("EvidenceStatement", () => {
  it("matches snapshot", () => {
    expect(shallow(<PassageView {...passageViewProps} />)).toMatchSnapshot();
  });
});
