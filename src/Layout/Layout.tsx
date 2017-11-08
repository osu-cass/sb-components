import * as React from 'react';
 import { NavMenu } from './NavMenu';
import { Footer } from './Footer';
import { SbNavLink } from './SbNavLink';


interface LayoutProps {
    children?: React.ReactNode;
    links?: SbNavLink[];
    siteName: string;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className="site-body">
            <NavMenu siteName={this.props.siteName} links={this.props.links}  />
            <main id="main" className="container site-content" role="main">
                {this.props.children}
            </main>
            <Footer />
        </div>;
    }
}
