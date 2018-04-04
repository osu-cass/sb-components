import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemTableContainer, ErrorPageContainer } from "@src/index";
import {
  serverErrMock,
  notFoundErrMock
} from "@mocks/ErrorPageContainer/mocks";

storiesOf("Error Page Container", module)
  .add("empty props render", () => <ErrorPageContainer />)
  .add("server error render", () => <ErrorPageContainer {...serverErrMock} />)
  .add("not found render", () => <ErrorPageContainer {...notFoundErrMock} />);
