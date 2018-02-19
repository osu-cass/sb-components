import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  AboutTestItemsContainer,
  AboutTestItemsParams,
  AboutTestItemsPage
} from "src/index";
import { routerDecorator } from "../RouterDecorator";
import {
  mockAboutTestClient,
  mockAboutTestClientLoading,
  mockAboutTestClientReject,
  aboutTestMatch,
  aboutTestPath,
  aboutTestBadItem
} from "mocks/AboutTestItems/mocks";
import { Route, match } from "react-router";

storiesOf("About Test Items", module)
  .addDecorator(routerDecorator)
  .add("default", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          aboutClient={mockAboutTestClient}
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
          aboutClient={mockAboutTestClient}
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
          aboutClient={mockAboutTestClientReject}
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
          aboutClient={mockAboutTestClientLoading}
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
          aboutClient={mockAboutTestClient}
          errorRedirectPath=""
        />
      )}
    />
  ));
