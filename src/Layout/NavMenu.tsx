import '../Styles/nav.less'
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SbNavLink, SbNavlinkProps } from './SbNavLink';

export interface NavMenuProps {
    links?: SbNavlinkProps[];
    siteName: string;
}

export class NavMenu extends React.Component<NavMenuProps, {}> {
    private renderLinks(){
        const links = this.props.links;
        if(links){
            const sbLinks = links.map((l, key) => <SbNavLink {...l} key={key}/>);
            return <div className="sbNav-linksGroup">
                    {sbLinks}
                </div>
            
        }else{
            return null;
        }
    }

    public render() {
        return <header role="navigation">
            <div className="skip-link" id="skip-main">
                <Link className="skip-link" to={{ hash: "main" }}>Skip to main content</Link> 
            </div>
            <nav role="navigation">
                <div className="sbNav">
                    <div className="sbNav-titleGroup">
                        <div className="sbNav-titleGroup-item">
                            <a target="_blank" href="http://www.smarterbalanced.org/" title="Smarter Balanced Home">
                                <img alt="Smarter Balanced Logo" src="/Images/SmarterBalanced_logo.png"></img>
                            </a>
                        </div>
                        <div className="sbNav-titleGroup-item">
                            <h3>{this.props.siteName}</h3>
                        </div>
                    </div>
                    {this.renderLinks()}
                </div>
            </nav >
        </header>;
    }
}
