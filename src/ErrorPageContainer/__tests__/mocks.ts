import { pageType, ErrorPageContainerProps } from "../ErrorPageContainer";

export const serverErrMock: ErrorPageContainerProps = {
  pageRender: pageType.ServerError,
  errorMsg: "you did a bad thing that caused errors",
  description: "stop doing that thing that caused errors"
};

export const notFoundErrMock: ErrorPageContainerProps = {
  pageRender: pageType.NotFound,
  errorMsg: "This item cannot be found",
  description: "Please try another search"
};
