import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import { AboutPTModal } from "@src/PerformanceType/AboutPT";
import { centerDecorator } from "../CenterDecorator";

storiesOf("About PT", module)
  .addDecorator(centerDecorator)
  .add("About Math", () => (
    <AboutPTModal subject="math" description="description" />
  ))
  .add("About ELA", () => (
    <AboutPTModal subject="ela" description="description" />
  ))
  .add("Nothing", () => (
    <AboutPTModal subject="subject" description="description" />
  ));
