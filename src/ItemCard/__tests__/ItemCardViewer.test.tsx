import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemCardViewer } from "../ItemCardViewer";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";

import { ItemCardModel, RubricModel, AboutItemModel } from "@src/index";
import { aboutItemMockModel } from "@mocks/index";

describe("ItemCardViewer", () => {
  it("renders viewer tab", () => {
    const wrapper = shallow(<ItemCardViewer item={aboutItemMockModel} />);
    wrapper.setState({ selectedTab: "viewer" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders rubric tab", () => {
    const wrapper = shallow(<ItemCardViewer item={aboutItemMockModel} />);
    wrapper.setState({ selectedTab: "rubric" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders information tab", () => {
    const wrapper = shallow(<ItemCardViewer item={aboutItemMockModel} />);
    wrapper.setState({ selectedTab: "information" });
    expect(wrapper).toMatchSnapshot();
  });
});
