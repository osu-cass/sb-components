import * as React from "react";
import { MemoryRouter } from "react-router";
import { Layout } from "src/Layout/Layout";

// tslint:disable-next-line:variable-name
export const LayoutDecorator = (storyFn: () => JSX.Element) => (
  <MemoryRouter initialEntries={["/"]}>
    <Layout children={storyFn()} siteName="SB-Components" />
  </MemoryRouter>
);
