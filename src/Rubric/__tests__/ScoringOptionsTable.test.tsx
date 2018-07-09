import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { SmarterAppOptionModel } from "../RubricModels";
import { scoringOptionsMock } from "@mocks/Rubric/ScoringOptionsMocks";
import { ScoringOptions } from "../ScoringOptionsTable";

describe("ScoringOptionsTable", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ScoringOptions options={scoringOptionsMock} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const wrapper = shallow(<ScoringOptions options={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
