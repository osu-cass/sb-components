import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export interface SbNavlinkProps {
  url: string;
  name: string;
}

export class SbNavLink extends React.Component<SbNavlinkProps, {}> {
  render() {
    return (
      <NavLink
        to={this.props.url}
        exact
        activeClassName="active"
        className="nav-linksGroup-item"
      >
        <span className="" /> {this.props.name}
      </NavLink>
    );
  }
}
