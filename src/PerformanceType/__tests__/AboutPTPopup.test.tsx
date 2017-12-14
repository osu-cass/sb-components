import * as React from "react";
import { shallow } from "enzyme";
import { AboutPTPopupModal } from "../AboutPTPopup";

describe("AboutPTPopupModal", () => {
  const wrapperUnExpanded = shallow(
    <AboutPTPopupModal
      subject="test"
      description="lorem ipsum"
      isPerformance={false}
      showModal={false}
    />,
    { lifecycleExperimental: true }
  );

  const WrapperExpanded = shallow(
    <AboutPTPopupModal
      subject="test"
      description="lorem ipsum"
      isPerformance={false}
      showModal={true}
    />,
    { lifecycleExperimental: true }
  );

  it("non-expanded AboutPT", () => {
    wrapperUnExpanded.findWhere(node => node.type() === AboutPTPopupModal);
    expect(wrapperUnExpanded).toMatchSnapshot();
  });

  it("expanded AboutPT", () => {
    WrapperExpanded.findWhere(node => node.type() === AboutPTPopupModal);
    expect(WrapperExpanded).toMatchSnapshot();
  });

  it("close button header AboutPT", () => {
    WrapperExpanded.findWhere(node => node.type() === "button")
      .at(0)
      .simulate("click");
    expect(WrapperExpanded).toMatchSnapshot();
  });

  it("close button footer AboutPT", () => {
    WrapperExpanded.findWhere(node => node.type() === "button")
      .at(1)
      .simulate("click");
    expect(WrapperExpanded).toMatchSnapshot();
  });
});
