import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface SbNavLink {
    url: string;
    name: string;    
}

export class SbNavLinkComponent extends React.Component<SbNavLink, {}> {
    public render() {
        return <NavLink to={this.props.url} exact activeClassName='active' className="sbNav-linksGroup-item">
             <span className=''></span> {this.props.name}
        </NavLink>
    }
}
