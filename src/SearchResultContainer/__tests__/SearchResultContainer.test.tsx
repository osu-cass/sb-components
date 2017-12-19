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

  //TODO: work on click simulations
});
