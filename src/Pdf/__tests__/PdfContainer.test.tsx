import * as React from "react";
import * as ReactDOM from "react-dom";
import { PdfContainer } from "../PdfContainer";
import { pdfContainerProps } from "./PdfMocks";
import { shallow, mount, render } from "enzyme";

describe("PdfComponent", () => {
  it("matches snapshot", () => {
    expect(shallow(<PdfContainer {...pdfContainerProps} />)).toMatchSnapshot();
  });
});
