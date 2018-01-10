import * as React from "react";

export interface LoadingOverlayProps {
  loading: boolean;
}

// tslint:disable-next-line:variable-name
export class LoadingOverlay extends React.Component<LoadingOverlayProps, {}> {
  render() {
    const { loading, children } = this.props;
    let content;
    if (loading) {
      content = (
        <div className="loader-overlay">
          <div className="loader" />
        </div>
      );
    } else if (children) {
      content = children;
    }

    // tslint:disable-next-line:no-null-keyword
    return content ? content : null;
  }
}
