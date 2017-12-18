import * as React from "react";
import { shallow } from "enzyme";

import { ItemCard, ItemCardProps } from "../ItemCard";
import { GradeLevels } from "../../GradeLevels/GradeLevels";
import { Redirect } from "react-router";

const itemVM: ItemCardProps = {
  bankKey: 1,
  itemKey: 1,
  gradeLabel: "grade 3",
  subjectLabel: "math",
  claimCode: "234536",
  targetId: "23463467",
  domain: "MATH",
  depthOfKnowledge: "",
  commonCoreStandardId: "",
  title: "",
  grade: GradeLevels.Grade6,
  subjectCode: "MATH",
  claimLabel: "Math Claim",
  targetShortName: "1-3",
  interactionTypeCode: "",
  interactionTypeLabel: "",
  isPerformanceItem: false,
  brailleOnlyItem: false,
  targetHash: 1212
};

describe("ItemCard", () => {
  const wrapper = shallow(<ItemCard {...itemVM} />);

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: test redirects
});
