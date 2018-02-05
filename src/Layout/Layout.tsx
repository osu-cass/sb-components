import * as React from "react";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import { SbNavlinkProps } from "./SbNavLink";

export interface LayoutProps {
  children?: React.ReactNode;
  links?: SbNavlinkProps[];
  siteName: string;
}

export class Layout extends React.Component<LayoutProps, {}> {
  render() {
    return (
      <div id="site-body" className="site-body">
        <NavMenu
          siteName={this.props.siteName}
          links={this.props.links}
          mainContentId="main"
        />
        <main id="main" className="site-content" role="main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}
