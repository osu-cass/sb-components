import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  AboutTestItemsModel,
  AboutTestItemsParams
} from "./AboutTestItemsModels";
import { AboutTestItemsContainer } from "./AboutTestItemsContainer";
import { RouteComponentProps } from "react-router";

/**
 * Entry point for About Test Items
 * Requires router params
 * @interface AboutTestItemsPageProps
 * @extends {RouteComponentProps<AboutTestItemsParams>}
 */
export interface AboutTestItemsPageProps
  extends RouteComponentProps<AboutTestItemsParams> {
  aboutClient: (
    params?: { interactionTypeCode: string }
  ) => Promise<AboutTestItemsModel>;
  showRubrics: boolean;
  appName?: string;
  errorRedirectPath: string;
}

export class AboutTestItemsPage extends React.Component<
  AboutTestItemsPageProps,
  {}
> {
  constructor(props: AboutTestItemsPageProps) {
    super(props);
  }

  componentDidMount() {
    const { appName } = this.props;

    if (appName) {
      document.title = `About Test Items - Smarter Balanced ${appName}`;
    }
  }

  render() {
    const aboutItemsParams = this.props.match.params;

    return (
      <AboutTestItemsContainer {...this.props} params={aboutItemsParams} />
    );
  }
}
