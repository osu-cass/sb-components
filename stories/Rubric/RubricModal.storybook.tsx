import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Rubric, RubricModel, RubricModal, RubricModalProps } from "@src/index";
import { rubricModalMockProps } from "@mocks/Rubric/mocks";

storiesOf("Rubric Modal", module).add("with rubric modal", () => (
  <RubricModal {...rubricModalMockProps} />
));
