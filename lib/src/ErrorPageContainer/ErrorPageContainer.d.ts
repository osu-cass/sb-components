import * as React from "react";
/**
 * pageType enum
 * @enum {number}
 */
export declare enum pageType {
    ServerError = 500,
    NotFound = 404,
}
/**
 * ErrorPageContainerProps props
 * @interface ErrorPageContainerProps
 * @member {pageType?} pageRender
 * @member {string?} errorMsg
 * @member {string?} description
 */
export interface ErrorPageContainerProps {
    errorCode?: pageType;
    errorMsg?: string;
    description?: string;
}
/**
 * The ErrorPageContainer is a component for display any page errors.
 * @class ErrorPageContainer
 * @extends {React.Component<SearchResultContainerProps, SearchResultContainerState>}
 */
export declare class ErrorPageContainer extends React.Component<ErrorPageContainerProps, {}> {
    static defaultProps: Partial<ErrorPageContainerProps>;
    constructor(props: ErrorPageContainerProps);
    /**
     * renders header, status code and error type.
     */
    renderHeader(): JSX.Element;
    /**
     * renders body, error description or user instructions.
     */
    renderBody(): JSX.Element;
    render(): JSX.Element;
}
