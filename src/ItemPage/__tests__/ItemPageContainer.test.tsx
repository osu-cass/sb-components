import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { ItemPageContainer } from "@src/index";
import {
  itemPageContainerPropsMock,
  itemPageContainerPropsNoItemMock
} from "@mocks/ItemPage/mocks";

describe("ItemPageContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <ItemPageContainer {...itemPageContainerPropsMock} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("It renders correctly when there is no item", () => {
    const wrapper = shallow(
      <ItemPageContainer {...itemPageContainerPropsNoItemMock} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
