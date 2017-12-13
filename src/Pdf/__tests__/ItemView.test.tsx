import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemView } from "../ItemView";
import { ItemPdfModel, PdfViewType } from "../PdfModels";
import { shallow, mount, render } from "enzyme";

const itemView: ItemPdfModel = {
  id: "12334",
  html: null,
  picturePath: null,
  captured: true,
  type: PdfViewType.html
};

describe("EvidenceStatement", () => {
  it("matches snapshot", () => {
    expect(shallow(<ItemView view={itemView} />)).toMatchSnapshot();
  });
});
