import * as React from "react";
import { ItemViewPage } from "@src/index";
import { storiesOf } from "@storybook/react";
import { routerDecorator } from "../RouterDecorator";
import {
  aboutThisClient,
  itemPageClient,
  itemAccessibilityClient,
  itemPagePath,
  itemPageMatch
} from "@mocks/ItemPage/mocks";
import { Route } from "react-router";

storiesOf("Item View", module)
  .addDecorator(routerDecorator)
  .add("default", () => (
    <Route
      exact
      path="/"
      render={props => (
        <ItemViewPage
          {...props}
          showRubrics={true}
          match={itemPageMatch}
          aboutThisClient={aboutThisClient}
          itemPageClient={itemPageClient}
          itemAccessibilityClient={itemAccessibilityClient}
          errorRedirectPath=""
        />
      )}
    />
  ));
