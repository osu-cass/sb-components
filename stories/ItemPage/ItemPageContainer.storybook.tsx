import * as React from "react";
import { ItemViewPage } from "src/index";
import { storiesOf } from "@storybook/react";
import { RouterDecorator } from "../RouterDecorator";
import {
  aboutThisClient,
  itemPageClient,
  itemAccessibilityClient,
  itemPagePath,
  itemPageMatch
} from "mocks/ItemPage/mocks";
import { Route } from "react-router";

storiesOf("Item Page Container", module)
  .addDecorator(RouterDecorator)
  .add("just the container", () => (
    <Route
      exact
      path={itemPagePath}
      render={props => (
        <ItemViewPage
          {...props}
          showRubrics={true}
          match={itemPageMatch}
          aboutThisClient={aboutThisClient}
          itemPageClient={itemPageClient}
          itemAccessibilityClient={itemAccessibilityClient}
        />
      )}
    />
  ));
