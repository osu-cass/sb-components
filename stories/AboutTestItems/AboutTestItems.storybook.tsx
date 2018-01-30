import "jsdom-global/register";
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
          appName="Storybook"
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
          appName="Storybook"
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
          appName="Storybook"
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
          appName="Storybook"
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
          appName="Storybook"
        />
      )}
    />
  ));
