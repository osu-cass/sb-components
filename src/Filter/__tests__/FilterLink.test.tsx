import * as React from "react";
import { mount } from "enzyme";
import "jsdom-global/register";
import { FilterLink } from "@src/index";

const wrapper = mount(<FilterLink filterId="sb-filter-id" />);

it("filter link test", () => {
  wrapper.simulate("click");
  expect(wrapper).toMatchSnapshot();
});
