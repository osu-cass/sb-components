import * as React from "react";
import { shallow } from "enzyme";
import { BrailleLink, BrailleLinkState } from "../Braille";

describe("Braille", () => {
  const wrapper = shallow(
    <BrailleLink
      currentSelectionCode="test"
      brailleItemCodes={["1", "2", "test"]}
      braillePassageCodes={["1", "2"]}
      bankKey={111}
      itemKey={222}
    />
  );

  it("renders correctly", () => {
    wrapper.findWhere(node => node.type() === BrailleLink);
    expect(wrapper).toMatchSnapshot();
  });

  it("no render", () => {
    const noRenderWrapper = shallow(
      <BrailleLink
        currentSelectionCode="nonMatchingCode"
        brailleItemCodes={["1", "2"]}
        braillePassageCodes={["1", "2"]}
        bankKey={111}
        itemKey={222}
      />
    );

    expect(noRenderWrapper).toMatchSnapshot();
  });

  it("refresh state", () => {
    const newState: BrailleLinkState = { displaySpinner: true };
    const newWrapper = wrapper.setState(newState);

    expect(newWrapper).toMatchSnapshot();
    expect(newWrapper.find(".glyphicon-refresh")).toMatchSnapshot();
  });
});
