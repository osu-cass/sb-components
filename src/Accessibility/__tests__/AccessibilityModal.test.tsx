import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import {
  accessibilityModalProp,
  mockAccResourceGroups,
  allAccessibilityResourceGroups,
  accessibilityManyOptionsMock,
  accessibilityManyOptionsInfoMock
} from "@mocks/Accessibility/mocks";
import { ItemAccessibilityModal, ResourceSelectionsModel } from "@src/index";

describe("AccessibilityModal", () => {
  const onSaveHandler = jest.fn((selections: ResourceSelectionsModel) => {
    return;
  });
  const onResetHandler = jest.fn();

  const wrapper = shallow(
    <ItemAccessibilityModal
      accResourceGroups={mockAccResourceGroups}
      onSave={onSaveHandler}
      onReset={onResetHandler}
    />
  );

  it("defualt render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("accessibility open", () => {
    wrapper.setProps({ showModal: true });
    expect(wrapper).toMatchSnapshot();
  });
});

describe("AccessibilityModal with six options showing", () => {
  const wrapper = shallow(
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={accessibilityManyOptionsMock}
    />
  );

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("AccessibilityModal with info tag showing", () => {
  const wrapper = shallow(
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={accessibilityManyOptionsInfoMock}
    />
  );

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("AccessibilityModal with no options", () => {
  const wrapper = shallow(
    <ItemAccessibilityModal
      {...accessibilityModalProp}
      showModal={true}
      accResourceGroups={[]}
    />
  );

  it("Renders No Options correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
