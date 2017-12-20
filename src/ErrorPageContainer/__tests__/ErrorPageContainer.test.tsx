import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import { shallow } from "enzyme";
import { ErrorPageContainer } from "../ErrorPageContainer";
import { serverErrMock, notFoundErrMock } from "./mocks";

describe("ErrorPageContainer", () => {
  it("default render empty props", () => {
    const wrapper = shallow(<ErrorPageContainer />);
    expect(wrapper).toMatchSnapshot();
  });

  it("render server error page", () => {
    const wrapper = shallow(<ErrorPageContainer {...serverErrMock} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("render not found page", () => {
    const wrapper = shallow(<ErrorPageContainer {...notFoundErrMock} />);
    expect(wrapper).toMatchSnapshot();
  });
});
