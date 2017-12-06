import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AdvFilTestWrapper from "../AdvFilTestWrapper";

const props: any = {
  pageTitle: "Search"
};

storiesOf("Advanced Filter Container", module)
  .add("normal render", () => <AdvFilTestWrapper />)
  .add("page title", () => <AdvFilTestWrapper properties={props} />);
