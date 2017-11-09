import * as React from "react";
import { Footer } from "./Footer";
import { NavMenu } from "./NavMenu";
import { SbNavlinkProps } from "./SbNavLink";

export interface LayoutProps {
  children?: React.ReactNode;
  links?: SbNavlinkProps[];
  siteName: string;
}

export class Layout extends React.Component<LayoutProps, {}> {
  render() {
    return (
      <div className="site-body">
        <NavMenu siteName={this.props.siteName} links={this.props.links} />
        <main id="main" className="container site-content" role="main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}
