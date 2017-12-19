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

  it("onload matches snapshot ItemCards", () => {
    let wrapper = shallow(<SearchResultContainer {...SearchResultCardProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("table to card transition", () => {
    let wrapper = shallow(
      <SearchResultContainer {...SearchResultTableProps} />
    );

    const eventMock = { currentTarget: { value: "1" } };

    wrapper
      .findWhere(node => node.type() === "button")
      .at(1)
      .simulate("click", eventMock);
    expect(wrapper).toMatchSnapshot();
  });

  it("card to table transition", () => {
    let wrapper = shallow(<SearchResultContainer {...SearchResultCardProps} />);

    const eventMock = { currentTarget: { value: "0" } };

    wrapper
      .findWhere(node => node.type() === "button")
      .at(1)
      .simulate("click", eventMock);
    expect(wrapper).toMatchSnapshot();
  });
});
