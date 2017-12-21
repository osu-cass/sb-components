import {
  pageType,
  ErrorPageContainerProps,
  ErrorPageContainerParams
} from "../../src/ErrorPageContainer/ErrorPageContainer";
import { match } from "react-router";

export const severParams: ErrorPageContainerParams = {
  errorCode: pageType.ServerError,
  errorMsg: "you did a bad thing that caused errors",
  description: "stop doing that thing that caused errors"
};

export const serverErrMock: match<ErrorPageContainerProps> = {
  params: severParams,
  isExact: true,
  path: "ErrorTestPath",
  url: "/"
};

export const notFoundErrMock: match<ErrorPageContainerProps> = {
  params: {
    pageRender: pageType.NotFound,
    errorMsg: "This item cannot be found",
    description: "Please try another search"
  },
  isExact: true,
  path: "ErrorTestPath",
  url: "/"
};
