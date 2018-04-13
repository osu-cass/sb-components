import * as React from "react";
import { shallow } from "enzyme";
import { Accordion, AccordionProps } from "@src/index";

const accordionContent = (
  <div id="test-content">
    test<p>I'm open</p>
  </div>
);

const accordionProps: AccordionProps = {
  accordionTitle: "testAccordion",
  isOpen: false,
  toggleExpand: jest.fn()
};

describe("Accordion", () => {
  const wrapper = shallow(
    <Accordion {...accordionProps}>{accordionContent}</Accordion>
  );
  const wrapperOpen = shallow(
    <Accordion {...accordionProps} isOpen={true}>
      {accordionContent}
    </Accordion>
  );

  it("matches closed snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("has no content when closed", () => {
    const content = wrapper.find("#test-content");
    expect(content).toHaveLength(0);
  });

  it("matches open snapshot", () => {
    expect(wrapperOpen).toMatchSnapshot();
  });

  it("has content when opened", () => {
    const content = wrapperOpen.find("#test-content");
    expect(content).toHaveLength(1);
  });

  it("calls handle show content when closed", () => {
    const button = wrapper.find(".accordion-bar");
    button.simulate("click");
    expect(accordionProps.toggleExpand).toHaveBeenCalled();
  });

  it("call handle show content when open", () => {
    const button = wrapperOpen.find(".accordion-bar");
    button.simulate("click");
    expect(accordionProps.toggleExpand).toHaveBeenCalled();
  });

  it("renders closed then open", () => {
    wrapper.setProps({ isOpen: true });
    const content = wrapper.find("#test-content");
    expect(content).toHaveLength(1);
  });
});
