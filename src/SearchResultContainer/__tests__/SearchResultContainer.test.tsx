import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import {
  SearchResultTableProps,
  SearchResultCardProps,
  SearchResultEmptyProps
} from "mocks/SearchResultContainer/mocks";
import { SearchResultContainer } from "../SearchResultContainer";

describe("SearchResultContainer", () => {
  it("onload matches snapshot table", () => {
    const wrapper = shallow(
      <SearchResultContainer {...SearchResultTableProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("onload matches snapshot ItemCards", () => {
    const wrapper = shallow(
      <SearchResultContainer {...SearchResultCardProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("empty itemCards", () => {
    const wrapper = shallow(
      <SearchResultContainer {...SearchResultEmptyProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("table to card transition", () => {
    const wrapper = shallow(
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
    const wrapper = shallow(
      <SearchResultContainer {...SearchResultCardProps} />
    );
    const eventMock = { currentTarget: { value: "0" } };

    wrapper
      .findWhere(node => node.type() === "button")
      .at(0)
      .simulate("click", eventMock);
    expect(wrapper).toMatchSnapshot();
  });
});
