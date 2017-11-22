import * as React from 'react';

export interface ErrorBoundaryProps {
    fallbackUI: React.Component<any,any>
}

export interface ErrorBoundaryState {
    hasError: boolean,
    error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor ( props: ErrorBoundaryProps ) {
        super( props );
        this.state = { hasError: false };
    }

    componentDidCatch (error: Error, info: any) {
        // Display fallback UI
        this.setState( { hasError: true } );
        // You can also log the error to an error reporting service
        // logError(error);
    }

    render () {
        const {hasError, error} = this.state;
        let content = this.props.children;
        if ( hasError ) {
            // You can render any custom fallback UI
            content = this.props.fallbackUI;
        }
        return content;
    }
}