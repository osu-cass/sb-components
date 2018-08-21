import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RubricTable, RubricTableProps, RubricEntryModel } from "@src/index";
import { rubricModalMockProps } from "@mocks/Rubric/mocks";

const rubricTableMockProps: RubricTableProps = rubricModalMockProps;

storiesOf("Rubric Table DontTest", module).add("with a rubric table", () => (
  <RubricTable {...rubricTableMockProps} />
));
