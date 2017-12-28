import * as React from "react";
import { RouteComponentProps } from "react-router";

/**
 * pageType enum
 * @enum {number}
 */
export enum pageType {
  ServerError = 500,
  NotFound = 404
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
export class ErrorPageContainer extends React.Component<
  ErrorPageContainerProps,
  {}
> {
  public static defaultProps: Partial<ErrorPageContainerProps> = {
    errorMsg: "Something went wrong",
    description:
      "The page you’re looking for can’t be found. Try searching or returning home!"
  };

  constructor(props: ErrorPageContainerProps) {
    super(props);
  }

  /**
   * renders header, status code and error type.
   */
  renderHeader() {
    const { errorMsg, errorCode } = this.props;
    let errPageTitle = "";

    if (errorCode === pageType.NotFound) {
      errPageTitle = `Not Found: ${errorCode}`;
    } else if (errorCode === pageType.ServerError) {
      errPageTitle = `Server Error: ${errorCode}`;
    } else {
      errPageTitle = "Sorry!";
    }

    return (
      <div className="error-page-header">
        <h1>{errPageTitle}</h1>
        <h4>
          <strong>Error: </strong>
          {errorMsg}
        </h4>
      </div>
    );
  }

  /**
   * renders body, error description or user instructions.
   */
  renderBody() {
    const { description } = this.props;

    return (
      <div className="error-page-body">
        <p>{description}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="error-page-container">
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}
