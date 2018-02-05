import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export interface SbNavlinkProps {
  url: string;
  name: string;
}

export class SbNavLink extends React.Component<SbNavlinkProps, {}> {
  removeFocus = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.keyCode === 13) {
      const elem = e.target as HTMLElement;
      elem.blur();
      const body = document.getElementById("site-body");
      if (body) {
        body.scrollIntoView();
      }
    }
  };
  render() {
    return (
      <NavLink
        to={this.props.url}
        exact
        activeClassName="active"
        className="nav-linksGroup-item"
        onKeyUp={this.removeFocus}
      >
        <span className="" /> {this.props.name}
      </NavLink>
    );
  }
}
