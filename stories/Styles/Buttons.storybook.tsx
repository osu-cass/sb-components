import * as React from "react";
import { storiesOf } from "@storybook/react";
import { centerDecorator } from "../CenterDecorator";
import { action } from "@storybook/addon-actions";

const buttons = (
  <div>
    <button className="btn btn-default">btn-default</button>
    <button className="btn btn-primary">btn-primary</button>
    <button className="btn btn-success">btn-success</button>
    <button className="btn btn-info">btn-info</button>
    <button className="btn btn-warning">btn-warning</button>
    <button className="btn btn-danger">btn-danger</button>
    <button className="item-nav-btn btn btn-link">item-nav-btn</button>
    <button className="btn btn-link" role="button" onClick={action("Clicked")}>
      btn-link
    </button>
  </div>
);

const disabledButtons = (
  <div>
    <button disabled className="btn btn-default">
      btn-default
    </button>
    <button disabled className="btn btn-primary">
      btn-primary
    </button>
    <button disabled className="btn btn-success">
      btn-success
    </button>
    <button disabled className="btn btn-info">
      btn-info
    </button>
    <button disabled className="btn btn-warning">
      btn-warning
    </button>
    <button disabled className="btn btn-danger">
      btn-danger
    </button>
    <button disabled className="item-nav-btn btn btn-link">
      item-nav-btn
    </button>
  </div>
);

storiesOf("Style", module)
  .addDecorator(centerDecorator)
  .add("Buttons bg-light", () => (
    <div className="section section-light">{buttons}</div>
  ))
  .add("Buttons Disabled bg-light", () => (
    <div className="section section-light">{disabledButtons}</div>
  ))
  .add("Buttons bg-dark", () => (
    <div className="section section-dark">{buttons}</div>
  ))
  .add("Buttons Disabled bg-dark", () => (
    <div className="section section-dark">{disabledButtons}</div>
  ))
  .add("Buttons Sizes", () => (
    <div className="section section-light">
      <button className="btn btn-sm btn-blue">btn-sm</button>
      <button className="btn btn-gray">btn-gray</button>
      <button className="btn btn-lg btn-green">btn-lg</button>
    </div>
  ));
