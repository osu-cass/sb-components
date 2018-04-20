import * as React from "react";
export interface ErrorBoundaryProps {
    fallbackUI: JSX.Element;
}
export interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: any;
}
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error, info: any): void;
    render(): JSX.Element | React.ReactNode;
}
