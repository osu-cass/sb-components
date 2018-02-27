import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import {
  RubricEntryModel,
  SampleResponseModel,
  RubricSampleModel,
  RubricModel
} from "../RubricModels";
import { RubricEntry } from "../RubricEntry";
import { SampleResponse } from "../SampleResponse";
import { Rubric } from "../Rubric";

const entry: RubricEntryModel = {
  scorepoint: "123",
  name: "Steve Harvey",
  value: "val"
};

const sampleResponse: SampleResponseModel = {
  purpose: "purpose",
  scorePoint: "scorePoint",
  name: "name",
  sampleContent: "sampleContent"
};

const samples: RubricSampleModel[] = [];

const rubric: RubricModel = {
  samples,
  language: "english",
  rubricEntries: [entry]
};

describe("RubricEntryComponent", () => {
  it("matches snapshot", () => {
    expect(shallow(<RubricEntry {...entry} />)).toMatchSnapshot();
  });
});

describe("SampleResponseComponent", () => {
  it("matches snapshot", () => {
    expect(shallow(<SampleResponse {...sampleResponse} />)).toMatchSnapshot();
  });
});

describe("rubric component", () => {
  it("matches snapshot", () => {
    expect(shallow(<Rubric {...rubric} />)).toMatchSnapshot();
  });
});
