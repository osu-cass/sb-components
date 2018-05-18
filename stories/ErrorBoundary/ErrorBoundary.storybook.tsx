import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ErrorBoundary } from "@src/ErrorBoundary/ErrorBoundary";
import { centerDecorator } from "../CenterDecorator";

class ErrorMssg extends React.Component {
  render() {
    return <div>An error occured.</div>;
  }
}

interface State {
  clicks: number;
}

class ErrorThrower extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clicks: 0
    };
  }

  handleClick = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };

  render() {
    if (this.state.clicks > 0) {
      throw new Error("Error");
    }

    return (
      <div>
        <button
          type="button"
          className="test-button"
          onClick={this.handleClick}
        >
          Click Me!
        </button>
      </div>
    );
  }
}

storiesOf("Error Boundary", module)
  .addDecorator(centerDecorator)
  .add("shows the fallback ui", () => (
    <ErrorBoundary fallbackUI={<ErrorMssg />}>
      <ErrorThrower />
    </ErrorBoundary>
  ));
