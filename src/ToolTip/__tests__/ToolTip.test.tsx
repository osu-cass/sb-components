import * as React from "react";
import { shallow } from "enzyme";
import { ToolTip } from "../ToolTip";

describe("ToolTip", () => {
  const wrapper = shallow(
    <ToolTip helpText={<p>test</p>} displayIcon={true} position="top">
      Sample text
    </ToolTip>
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("displays help when hovered", () => {
    wrapper.find(".tool-tip-hoverable").simulate("focus");
    expect(wrapper).toMatchSnapshot();
  });
});
