import * as React from "react";
import { shallow } from "enzyme";
import { GradeLevel, GradeLevels } from "../GradeLevels";

const gradeLevel3: GradeLevels = GradeLevels.Grade3;
const gradeLevel4: GradeLevels = GradeLevels.Grade4;
const gradeLevel5: GradeLevels = GradeLevels.Grade5;
const gradeLevel6: GradeLevels = GradeLevels.Grade6;
const gradeLevel7: GradeLevels = GradeLevels.Grade7;
const gradeLevel8: GradeLevels = GradeLevels.Grade8;
const gradeLevel9: GradeLevels = GradeLevels.Grade9;
const gradeLevel10: GradeLevels = GradeLevels.Grade10;
const gradeLevel11: GradeLevels = GradeLevels.Grade11;
const gradeLevel12: GradeLevels = GradeLevels.Grade12;
const gradeLevelNA: GradeLevels = GradeLevels.NA;
const gradeLevelElementary: GradeLevels = GradeLevels.Elementary;
const gradeLevelMiddle: GradeLevels = GradeLevels.Middle;
const gradeLevelHigh: GradeLevels = GradeLevels.High;

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel3);
  expect(value).toEqual("Grade 3");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel4);
  expect(value).toEqual("Grade 4");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel5);
  expect(value).toEqual("Grade 5");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel6);
  expect(value).toEqual("Grade 6");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel7);
  expect(value).toEqual("Grade 7");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel8);
  expect(value).toEqual("Grade 8");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel9);
  expect(value).toEqual("Grade 9");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel10);
  expect(value).toEqual("Grade 10");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel11);
  expect(value).toEqual("Grade 11");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevel12);
  expect(value).toEqual("Grade 12");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevelNA);
  expect(value).toEqual("NA");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevelElementary);
  expect(value).toEqual("Elementary");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevelMiddle);
  expect(value).toEqual("Middle");
});

it("Check if grade level to string return correct value", () => {
  const value = GradeLevel.gradeCaseToString(gradeLevelHigh);
  expect(value).toEqual("High");
});
