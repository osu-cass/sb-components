import * as React from "react";
import { ItemPageContainer } from "../../src/ItemPage/ItemPageContainer";
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
        <ItemPageContainer
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
