import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Assets/Styles/nav.less";
import { SbNavLink, SbNavlinkProps } from "./SbNavLink";
const sbLogo = require("../Assets/Images/SmarterBalanced_logo.png");

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
      content = <div className="sbNav-linksGroup">{sbLinks}</div>;
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
        <nav role="navigation">
          <div className="sbNav">
            <div className="sbNav-titleGroup">
              <div className="sbNav-titleGroup-item">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="http://www.smarterbalanced.org/"
                  title="Smarter Balanced Home"
                >
                  <img alt="Smarter Balanced Logo" src={sbLogo} />
                </a>
              </div>
              <div className="sbNav-titleGroup-item">
                <h3>{this.props.siteName}</h3>
              </div>
            </div>
            {this.renderLinks()}
          </div>
        </nav>
      </header>
    );
  }
}
