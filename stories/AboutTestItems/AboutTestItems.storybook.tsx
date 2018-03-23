import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  AboutTestItemsContainer,
  AboutTestItemsParams,
  AboutTestItemsPage
} from "@src/index";
import { routerDecorator } from "../RouterDecorator";
import {
  aboutTestMatch,
  aboutTestPath,
  aboutTestBadItem,
  mockAboutLoading,
  mockAboutClientSuccess,
  mockAboutRejectClient
} from "@mocks/AboutTestItems/mocks";
import { Route, match } from "react-router";
import { LayoutDecorator } from "../LayoutDecorator";

storiesOf("About Test Items", module)
  .addDecorator(routerDecorator)
  .addDecorator(LayoutDecorator)
  .add("default", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          aboutClient={mockAboutClientSuccess}
          errorRedirectPath=""
        />
      )}
    />
  ))
  .add("default, param", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          match={aboutTestMatch}
          aboutClient={mockAboutClientSuccess}
          errorRedirectPath=""
        />
      )}
    />
  ))
  .add("reject, param", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          match={aboutTestMatch}
          aboutClient={mockAboutRejectClient}
          errorRedirectPath=""
        />
      )}
    />
  ))
  .add("loading, param", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          match={aboutTestMatch}
          aboutClient={mockAboutLoading}
          errorRedirectPath=""
        />
      )}
    />
  ))
  .add("bad item type", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          match={aboutTestBadItem}
          aboutClient={mockAboutClientSuccess}
          errorRedirectPath=""
        />
      )}
    />
  ));
