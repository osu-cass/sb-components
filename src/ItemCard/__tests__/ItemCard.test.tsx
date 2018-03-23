import * as React from "react";
import { shallow } from "enzyme";
import { ItemCard, ItemCardModel, GradeLevels } from "@src/index";
import { completeItemCard } from "@mocks/index";

describe("ItemCard", () => {
  const wrapper = shallow(<ItemCard {...completeItemCard} />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
