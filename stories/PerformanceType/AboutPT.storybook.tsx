import * as React from "react";
import * as $ from "jquery";
import { storiesOf } from "@storybook/react";
import { AboutPTModal } from "../../src/PerformanceType/AboutPT";
import { CenterDecorator } from "../CenterDecorator";

storiesOf("About PT", module)
  .addDecorator(CenterDecorator)
  .add("About Math", () => (
    <AboutPTModal subject="math" description="description" />
  ))
  .add("About ELA", () => (
    <AboutPTModal subject="ela" description="description" />
  ))
  .add("Nothing", () => (
    <AboutPTModal subject="subject" description="description" />
  ));
