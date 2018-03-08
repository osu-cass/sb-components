import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemView } from "../ItemView";
import { ItemPdfModel, PdfViewType } from "../PdfModels";
import { shallow, mount, render } from "enzyme";

const itemView: ItemPdfModel = {
  id: "12334",
  html: undefined,
  picturePath: undefined,
  captured: true,
  type: PdfViewType.html
};

const itemView1: ItemPdfModel = {
  id: "12334",
  html: "<div>hello world</div>",
  picturePath: undefined,
  captured: true,
  type: PdfViewType.html
};

const itemView2: ItemPdfModel = {
  id: "12334",
  html: "<div>hello world</div>",
  picturePath: "filename",
  captured: true,
  type: PdfViewType.picture
};

describe("EvidenceStatement", () => {
  it("matches snapshot", () => {
    expect(shallow(<ItemView view={itemView} />)).toMatchSnapshot();
  });

  it("matches snapshot with html", () => {
    expect(shallow(<ItemView view={itemView1} />)).toMatchSnapshot();
  });

  it("matches snapshot with picture", () => {
    expect(shallow(<ItemView view={itemView2} />)).toMatchSnapshot();
  });
});
