import * as React from "react";
import { storiesOf } from "@storybook/react";
import { CenterDecorator } from "../CenterDecorator";
import {
  AboutTestItemsContainer,
  AboutTestItemsParams,
  AboutTestItemsPage
} from "src/index";
import { RouterDecorator } from "../RouterDecorator";
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
  .addDecorator(RouterDecorator)
  .add("default", () => (
    <Route
      exact
      path={aboutTestPath}
      render={props => (
        <AboutTestItemsPage
          {...props}
          showRubrics={true}
          aboutClient={mockAboutTestClient}
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
        />
      )}
    />
  ));
