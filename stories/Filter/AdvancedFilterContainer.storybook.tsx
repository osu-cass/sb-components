import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { checkA11y } from "@storybook/addon-a11y";
import {
  AdvFilContainerTestWrapper,
  AdvFilContainerTestProps
} from "../FilterTestWrappers";

const props: AdvFilContainerTestProps = {
  pageTitle: "Search"
};

storiesOf("Advanced Filter Container", module)
  .addDecorator(checkA11y)
  .add("normal render", () => <AdvFilContainerTestWrapper />)
  .add("with page title", () => <AdvFilContainerTestWrapper {...props} />);
