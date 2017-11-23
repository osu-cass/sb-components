import * as React from 'react';

export interface ErrorBoundaryProps {
    fallbackUI: JSX.Element;
}

export interface ErrorBoundaryState {
    hasError: boolean,
    error?: Error | null,
    errorInfo: any | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor ( props: ErrorBoundaryProps ) {
        super( props );
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch ( error: Error, info: any ) {
        // Display fallback UI
        this.setState( { hasError: true, error, errorInfo: info } );
        // You can also log the error to an error reporting service
    }

    render () {
        let content = this.props.children;
        if ( this.state.hasError ) {
            // You can render any custom fallback UI
            content = this.props.fallbackUI;
        }
        return content;
    }
}