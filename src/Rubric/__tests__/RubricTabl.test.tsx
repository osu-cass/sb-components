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
import { RubricTable } from "../RubricTable";


describe("Rubric table", ()=> {
    it("matches snapshot", () => {
        expect(shallow(<RubricTable />)).toMatchSnapshot();
    })
});