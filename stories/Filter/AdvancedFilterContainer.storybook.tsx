import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {
  AdvFilContainerTestWrapper,
  AdvFilContainerTestProps
} from "../FilterTestWrappers";

const props: AdvFilContainerTestProps = {
  pageTitle: "Search"
};

storiesOf("Advanced Filter Container", module)
  .add("normal render", () => <AdvFilContainerTestWrapper />)
  .add("with page title", () => <AdvFilContainerTestWrapper {...props} />);
