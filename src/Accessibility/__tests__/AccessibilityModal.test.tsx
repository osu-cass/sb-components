import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { mockAccResourceGroups } from "mocks/Accessibility/mocks";
import { ItemAccessibilityModal } from "../AccessibilityModal";
import { ResourceSelectionsModel } from "../AccessibilityModels";

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
