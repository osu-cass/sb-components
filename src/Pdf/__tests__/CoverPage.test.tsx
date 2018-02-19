import * as React from "react";
import * as ReactDOM from "react-dom";
import { CoverPage } from "../CoverPage";
import { shallow, mount, render } from "enzyme";

describe("First page", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(
      <CoverPage subject="math" grade="grade 3" dateString="01/12/2017" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
