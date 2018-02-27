import * as React from "react";

const style: React.CSSProperties = {
  width: "8.5in",
  minHeight: "11in",
  border: "2px dashed #ccc",
  padding: ".75in",
  margin: "20px auto"
};

export const pdfDecorator = (storyFn: () => JSX.Element) => (
  <div style={style}>{storyFn()}</div>
);
