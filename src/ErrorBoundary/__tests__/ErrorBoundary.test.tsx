import * as React from "react";
import * as ReactDOM from "react-dom";
import "jsdom-global/register";
import { shallow, mount, render } from "enzyme";
import { ErrorBoundary } from "../ErrorBoundary";

// tslint:disable: variable-name
const ErrorMssg: React.SFC = () => {
  return <div>An error occured.</div>;
};

const ErrorThrower: React.SFC = () => {
  const handleClick = () => {
    throw new Error("Test Error");
  };

  return (
    <div>
      <button className="test-button" onClick={() => handleClick}>
        Click Me!
      </button>
    </div>
  );
};

describe("ErrorBoundary", () => {
  const wrapper = mount(
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
