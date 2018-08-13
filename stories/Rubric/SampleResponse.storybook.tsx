import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SampleResponse } from "@src/index";
import { SampleResponseModel } from "@src/Rubric/RubricModels";

const sampleResponseMockProps: SampleResponseModel = {
  purpose: "Exemplar",
  scorePoint: "1",
  name: "1-Point Official Sample Answer\n      ",
  sampleContent:
    '<p style="">Source #3 would most likely be relevant to students researching new approaches to increasing people\'s financial literacy. One example of a way people can increase their financial literacy discussed in this source is just-in-time education, where training is provided at "crucial moments" like right before someone decides on a student loan. Another example is giving people "simple rules of thumb" to follow.</p>'
};

storiesOf("Sample Response", module).add("with a sample response", () => (
  <SampleResponse {...sampleResponseMockProps} />
));
