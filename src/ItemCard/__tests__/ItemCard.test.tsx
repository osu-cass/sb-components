import * as React from "react";
import { shallow } from "enzyme";
import { ItemCard, ItemCardModel, GradeLevels } from "@src/index";
import { completeItemCardELA } from "@mocks/index";

describe("ItemCard", () => {
  const wrapper = shallow(<ItemCard {...completeItemCardELA} />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
