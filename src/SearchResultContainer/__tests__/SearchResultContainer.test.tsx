import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { SearchResultTableProps, SearchResultCardProps } from "./mocks";
import { SearchResultContainer } from "../SearchResultContainer";

let wrapper = shallow(<SearchResultContainer {...SearchResultTableProps} />);

describe("SearchResultContainer", () => {
  it("onload matches snapshot table", () => {
    let wrapper = shallow(
      <SearchResultContainer {...SearchResultTableProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("table to card transition", () => {
    let wrapper = shallow(
      <SearchResultContainer {...SearchResultTableProps} />
    );
    wrapper
      .find(".btn-white")
      .at(0)
      .simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  it("onload matches snapshot ItemCards", () => {
    let wrapper = shallow(<SearchResultContainer {...SearchResultCardProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  //TODO: work on click simulations
});
