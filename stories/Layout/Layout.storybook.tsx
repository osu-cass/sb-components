import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Layout } from "../../src";
import { RouterDecorator } from "../RouterDecorator";
import { SiteLinks } from "mocks/Layout/mocks";

const style: React.CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "800px",
  minWidth: "1200px",
  backgroundColor: "lightgrey"
};

const body = (
  <div className="container test-container">
    <div style={style}>
      <p>Test Body...</p>
    </div>
  </div>
);
storiesOf("Layout", module)
  .addDecorator(RouterDecorator)
  .add("name no links no body", () => <Layout siteName="Test" />)
  .add("name links and body", () => (
    <Layout children={body} siteName="Test" links={SiteLinks} />
  ));
