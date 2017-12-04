import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import { ItemCardModel } from "../ItemCardModels";
import { GradeLevels } from "../../GradeLevels/GradeLevels";
import { ItemCardTable } from "../ItemCardTable";

const itemVM: ItemCardModel = {
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

describe("QuestionDataTable", () => {
  it("matches snapshot", () => {
    expect(shallow(<ItemCardTable card={itemVM} />)).toMatchSnapshot();
  });
});
