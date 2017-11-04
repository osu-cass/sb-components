import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
            <nav role="navigation">
                <div className="sbNav">
                    <div className="sbNav-titleGroup">
                        <div className="sbNav-titleGroup-item">
                            <a target="_blank" href="http://www.smarterbalanced.org/">
                                <img alt="Smarter Balanced Logo" src="/images/SmarterBalanced_logo.png"></img>
                            </a>
                        </div>
                        <div className="sbNav-titleGroup-item">
                            <h3>Sample Items</h3>
                        </div>
                    </div>

                    <div className="sbNav-linksGroup">
                        <NavLink to={'/'} exact activeClassName='active' className="sbNav-linksGroup-item">
                            <span className=''></span> Home
                            </NavLink>
                 
                        <NavLink to={'/AboutItems'} exact activeClassName='active' className="sbNav-linksGroup-item">
                            <span className=''></span> About Test Items
                            </NavLink>
                        <NavLink to={'/BrowseItems'} exact activeClassName='active' className="sbNav-linksGroup-item">
                            <span className=''></span> Browse Test Items
                            </NavLink>

                    </div>
                </div>
            </nav >

        </div>;
    }
}
