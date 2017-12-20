import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ItemTableContainer } from "../../src/index";
import { ErrorPageContainer } from "../../src/ErrorPageContainer/ErrorPageContainer";
import { serverErrMock, notFoundErrMock } from "./mocks";

storiesOf("Error Page Container", module)
  .add("empty props render", () => <ErrorPageContainer />)
  .add("server error render", () => <ErrorPageContainer {...serverErrMock} />)
  .add("not found render", () => <ErrorPageContainer {...notFoundErrMock} />);
