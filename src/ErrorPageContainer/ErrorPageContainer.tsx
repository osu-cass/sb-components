import * as React from "react";
import "../Assets/Styles/error-page-container.less";

export enum pageType {
  ServerError = 500,
  NotFound = 404
}

export interface ErrorPageContainerProps {
  pageRender?: pageType;
  errorMsg?: string;
  description?: string;
}

const defaultErrorTitle = "Sorry!";
const defaultErrorMsg = "Something went wrong";
const defaultDescription =
  "The page you’re looking for can’t be found. Try searching or returning home!";

export class ErrorPageContainer extends React.Component<
  ErrorPageContainerProps,
  {}
> {
  constructor(props: ErrorPageContainerProps) {
    super(props);
  }

  renderHeader() {
    const errMessage = this.props.errorMsg
      ? this.props.errorMsg
      : defaultErrorMsg;
    let errPageTitle = "";

    if (this.props.pageRender === pageType.NotFound) {
      errPageTitle = `Not Found: ${this.props.pageRender}`;
    } else if (this.props.pageRender === pageType.ServerError) {
      errPageTitle = `Server Error: ${this.props.pageRender}`;
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

  renderBody() {
    const errDescription = this.props.description
      ? this.props.description
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
