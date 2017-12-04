import * as React from "react";
import * as ReactDOM from "react-dom";
import "jsdom-global/register";
import { shallow, mount, render } from "enzyme";
import { ErrorBoundary } from "../ErrorBoundary";

const ErrorMssg = () => {
  return <div>An error occured.</div>;
};

const ErrorThrower = () => {
  const handlecClick = () => {
    throw new Error("Test Error");
  };
  return (
    <div>
      <button className="test-button" onClick={this.handleClick}>
        Click Me!
      </button>
    </div>
  );
};

describe("ErrorBoundary", () => {
  let wrapper = mount(
    <ErrorBoundary fallbackUI={<ErrorMssg />}>
      <ErrorThrower />
    </ErrorBoundary>
  );
  it("before error is thrown", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("after the error is thrown", () => {
    wrapper.find("button.test-button").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });
});
