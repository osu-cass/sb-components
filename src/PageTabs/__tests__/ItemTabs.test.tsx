import * as React from "react";
import * as ReactDOM from "react-dom";
import { ItemTabs, Tabs } from "../ItemTabs";
import { shallow, mount, render } from "enzyme";

describe("PageTabs", () => {
  const tabs: Tabs[] = ["viewer", "rubric", "information"];

  const props = {
    changedTab: jest.fn((tab: Tabs) => {
      return undefined;
    }),
    selectedTab: tabs[0]
  };

  it("matches snapshot for each tab with no rubric", () => {
    const wrapper = shallow(<ItemTabs {...props} />);
    tabs.forEach(tab => {
      wrapper.setProps({ selectedTab: tab });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("matches snapshot for each tab with rubric", () => {
    const wrapper = shallow(<ItemTabs {...props} showRubricTab={true} />);
    tabs.forEach(tab => {
      wrapper.setProps({ selectedTab: tab });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("changes tabs", () => {
    const wrapper = shallow(<ItemTabs {...props} />);
    wrapper
      .find("ul.nav-tabs")
      .childAt(0)
      .simulate("click");
    expect(props.changedTab).toHaveBeenCalled();
  });
});
