import { pageType, ErrorPageContainerProps } from "@src/index";

export const serverErrMock: ErrorPageContainerProps = {
  errorCode: pageType.ServerError,
  errorMsg: "you did a bad thing that caused errors",
  description: "stop doing that thing that caused errors"
};

export const notFoundErrMock: ErrorPageContainerProps = {
  errorCode: pageType.NotFound,
  errorMsg: "This item cannot be found",
  description: "Please try another search"
};
