import * as React from "react";

export interface ErrorBoundaryProps {
  fallbackUI: JSX.Element;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
  errorInfo: any | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, info: any) {
    // You can log the error to an error reporting service here
    // Display fallback UI
    this.setState({ hasError: true, error, errorInfo: info });
  }

  render(): JSX.Element | React.ReactNode {
    return this.state.hasError ? this.props.fallbackUI : this.props.children;
  }
}
