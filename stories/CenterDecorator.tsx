import * as React from "react";

const style: React.CSSProperties = {
  display: "flex",
  flexFlow: "column nowrap",
  width: "100%",
  height: "100%",
  paddingTop: "300px",
  alignItems: "center",
  justifyContent: "center"
};

// helper component that centers our storybook stories on the screen
export const centerDecorator = (storyFn: () => JSX.Element) => (
  <div style={style} className="section section-dark">
    {storyFn()}
  </div>
);
