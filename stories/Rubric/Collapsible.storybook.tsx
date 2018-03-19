import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Collapsible } from "@src/Rubric/Collapsible";

const style = {
  height: "300px",
  width: "300px",
  background: "lightgrey"
};

const collapsibleStyle = {
  border: "1px solid red"
};

const box = <div style={style}>Collapsible Content</div>;

storiesOf("Collapsible", module)
  .add("No classname of style", () => (
    <Collapsible className="" style={{}} label="label">
      {box}
    </Collapsible>
  ))
  .add("Collapsible with inline red border", () => (
    <Collapsible className="" style={{ ...collapsibleStyle }} label="label">
      {box}
    </Collapsible>
  ))
  .add("Collapsible with CSS classname", () => (
    <Collapsible className="test-collapsible" style={{}} label="label">
      {box}
    </Collapsible>
  ));
