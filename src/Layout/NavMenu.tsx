import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { SbNavLink, SbNavlinkProps } from "./SbNavLink";
const sbLogo = require("@sbac/sbac-ui-kit/src/images/SmarterBalanced-Logo.png");

export interface NavMenuProps {
  links?: SbNavlinkProps[];
  siteName: string;
}

export class NavMenu extends React.Component<NavMenuProps, {}> {
  renderLinks() {
    const links = this.props.links;
    let content: JSX.Element | undefined;
    if (links) {
      const sbLinks = links.map((l, key) => <SbNavLink {...l} key={key} />);
      content = <div className="nav-linksGroup">{sbLinks}</div>;
    }

    return content;
  }

  render() {
    return (
      <header role="navigation">
        <div className="skip-link" id="skip-main">
          <Link className="skip-link" to={{ hash: "main" }}>
            Skip to main content
          </Link>
        </div>
        <nav className="nav-container" role="navigation">
          <div className="nav-content container">
            <div className="nav-titleGroup">
              <div className="nav-titleGroup-item">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="http://www.smarterbalanced.org/"
                  title="Smarter Balanced Home"
                >
                  <img alt="Smarter Balanced Logo" src={sbLogo} />
                </a>
              </div>
              <div className="nav-titleGroup-item">
                <h1 className="application-title">{this.props.siteName}</h1>
              </div>
            </div>
            {this.renderLinks()}
          </div>
        </nav>
      </header>
    );
  }
}
