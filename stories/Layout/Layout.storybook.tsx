import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Layout } from "../../src";
import { RouterDecorator } from "../RouterDecorator";
import { SiteLinks } from "mocks/Layout/mocks";

const style: React.CSSProperties = {
  width: "100%",
  height: "70vh",
  backgroundColor: "white"
};

const body = (
  <div className="container test-container">
    <div className="content" style={style}>
      <p>Test Body...</p>
    </div>
  </div>
);
storiesOf("Layout", module)
  .addDecorator(RouterDecorator)
  .add("name no links no body", () => <Layout siteName="Test" />)
  .add("name links and body", () => (
    <Layout children={body} siteName="SB-Components" links={SiteLinks} />
  ));
