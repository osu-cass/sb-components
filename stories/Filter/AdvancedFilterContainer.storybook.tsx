import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AdvFilContainerTestWrapper } from "../AdvFilTestWrappers";

const props: any = {
  pageTitle: "Search"
};

storiesOf("Advanced Filter Container", module)
  .add("normal render", () => <AdvFilContainerTestWrapper />)
  .add("with page title", () => (
    <AdvFilContainerTestWrapper properties={props} />
  ));
