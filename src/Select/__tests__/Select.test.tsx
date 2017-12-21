import * as React from "react";
import { Select } from "../Select";
import { SelectOptionProps } from "../SelectOption";
import { shallow } from "enzyme";

const onChange = jest.fn();
const options: SelectOptionProps[] = [
  {
    selected: false,
    label: "one",
    value: "one"
  },
  {
    selected: false,
    label: "two",
    value: "two"
  }
];

describe("Select", () => {
  const wrapper = shallow(
    <Select
      onChange={onChange}
      label="select"
      selected="default"
      options={options}
    />
  );

  it("handles on change event", () => {
    expect(wrapper).toMatchSnapshot();
    wrapper
      .findWhere(node => node.type() === "select")
      .simulate("change", { target: { value: "one" } });
    expect(onChange).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
