import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';
export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className="site-body">
            <NavMenu />
            <main id="main" className="container site-content" role="main">
                {this.props.children}
            </main>
            <Footer />
        </div>;
    }
}
