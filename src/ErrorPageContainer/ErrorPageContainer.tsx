import * as React from "react";
import { RouteComponentProps } from "react-router";
import "../Assets/Styles/error-page-container.less";

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
export interface ErrorPageContainerParams {
  errorCode?: pageType;
  errorMsg?: string;
  description?: string;
}

export interface ErrorPageContainerProps
  extends RouteComponentProps<ErrorPageContainerParams> {}

const defaultErrorTitle = "Sorry!";
const defaultErrorMsg = "Something went wrong";
const defaultDescription =
  "The page you’re looking for can’t be found. Try searching or returning home!";

/**
 * The ErrorPageContainer is a component for display any page errors.
 * @class ErrorPageContainer
 * @extends {React.Component<SearchResultContainerProps, SearchResultContainerState>}
 */
export class ErrorPageContainer extends React.Component<
  ErrorPageContainerProps,
  {}
> {
  constructor(props: ErrorPageContainerProps) {
    super(props);
  }

  /**
   * renders header, status code and error type.
   */
  renderHeader() {
    const errMessage = this.props.match.params.errorMsg
      ? this.props.match.params.errorMsg
      : defaultErrorMsg;
    let errPageTitle = "";

    if (this.props.match.params.errorCode === pageType.NotFound) {
      errPageTitle = `Not Found: ${this.props.match.params.errorCode}`;
    } else if (this.props.match.params.errorCode === pageType.ServerError) {
      errPageTitle = `Server Error: ${this.props.match.params.errorCode}`;
    } else {
      errPageTitle = defaultErrorTitle;
    }

    return (
      <div className="error-page-header">
        <h1>{errPageTitle}</h1>
        <h4>
          <strong>Error: </strong>
          {errMessage}
        </h4>
      </div>
    );
  }

  /**
   * renders body, error discription or user instructions.
   */
  renderBody() {
    const errDescription = this.props.match.params.description
      ? this.props.match.params.description
      : defaultDescription;

    return (
      <div className="error-page-body">
        <p>{errDescription}</p>
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
