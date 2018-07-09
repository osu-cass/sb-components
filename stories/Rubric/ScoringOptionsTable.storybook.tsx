import * as React from "react";
import { storiesOf } from "@storybook/react";
import { scoringOptionsMock } from "@mocks/Rubric/ScoringOptionsMocks";
import { ScoringOptions } from "@src/index";

storiesOf("Scoring Options Table", module).add("with two options", () => (
  <ScoringOptions options={scoringOptionsMock} />
));
