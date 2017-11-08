import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class Footer extends React.Component<{}, {}> {
    public render() {
        return <footer role="contentinfo">
            <a className="footer-sbLink footer-practiceTests" href="http://practice.smarterbalanced.org/">Practice and training tests are available here.</a>
            <div className="footer-copyright">
                <p>&copy; The Regents of the University of California – Smarter Balanced Assessment Consortium </p>
                <a className="footer-sbLink" href="//www.smarterbalanced.org"> www.SmarterBalanced.org</a>
            </div>
        </footer>;
        
    }
}
