import * as React from "react";
import { Collapsible } from "../Collapsible";
import { shallow } from "enzyme";

describe("Collapsible", () => {
  const wrapper = shallow(<Collapsible label="collapsible" />);
  it("expands", () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.findWhere(node => node.type() === "a").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  it("collapses", () => {
    wrapper.findWhere(node => node.type() === "a").simulate("click");
    expect(wrapper).toMatchSnapshot();
  });
});
