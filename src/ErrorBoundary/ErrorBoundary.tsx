import * as React from "react";

export interface ErrorBoundaryProps {
  fallbackUI: JSX.Element;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  // tslint:disable-next-line: no-any
  errorInfo?: any;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // tslint:disable-next-line: no-any
  componentDidCatch(error: Error, info: any) {
    // You can log the error to an error reporting service here
    // Display fallback UI
    this.setState({ error, hasError: true, errorInfo: info });
  }

  render(): JSX.Element | React.ReactNode {
    return this.state.hasError ? this.props.fallbackUI : this.props.children;
  }
}
