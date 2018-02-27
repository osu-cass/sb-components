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

  const wrapperExpanded = shallow(
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
    wrapperExpanded.findWhere(node => node.type() === AboutPTPopupModal);
    expect(wrapperExpanded).toMatchSnapshot();
  });

  it("close button header AboutPT", () => {
    wrapperExpanded
      .findWhere(node => node.type() === "button")
      .at(0)
      .simulate("click");
    expect(wrapperExpanded).toMatchSnapshot();
  });

  it("close button footer AboutPT", () => {
    wrapperExpanded
      .findWhere(node => node.type() === "button")
      .at(1)
      .simulate("click");
    expect(wrapperExpanded).toMatchSnapshot();
  });
});
