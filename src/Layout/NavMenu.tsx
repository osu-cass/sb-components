import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { SbNavLink, SbNavlinkProps } from "./SbNavLink";
const sbLogo = require("@sbac/sbac-ui-kit/src/images/SmarterBalanced-Logo.png");

export interface NavMenuProps {
  links?: SbNavlinkProps[];
  siteName: string;
  mainContentId: string;
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

  handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.keyCode === 13) {
      const link = e.target as HTMLElement;
      const element = document.getElementById(this.props.mainContentId);
      link.blur();
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  render() {
    return (
      <header role="navigation">
        <div id="skip-main">
          <a
            role="link"
            className="skip-link"
            tabIndex={0}
            onKeyDown={this.handleKeyDown}
          >
            Skip to main content
          </a>
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
