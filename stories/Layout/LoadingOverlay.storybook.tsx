import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LoadingOverlay } from "@src/index";

storiesOf("LoadingOverlay", module)
  .add("renders the loading spinner", () => <LoadingOverlay loading={true} />)
  .add("renders it's child elements", () => (
    <LoadingOverlay loading={false}>
      <div />
    </LoadingOverlay>
  ))
  .add("renders undefined when there are no children", () => (
    <LoadingOverlay loading={false} />
  ));
