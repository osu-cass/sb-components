import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { GradeLevels, ItemCardModel, ItemCardTable } from "@src/index";
import { completeItemCard } from "@mocks/index";

describe("QuestionDataTable", () => {
  it("matches snapshot", () => {
    expect(
      shallow(<ItemCardTable card={completeItemCard} />)
    ).toMatchSnapshot();
  });
});
