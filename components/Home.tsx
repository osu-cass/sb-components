import '../css/home.css';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';


export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="home-container">
            <div>
                <h1 className="home-title"><b>Welcome!</b></h1>
                Sup kevin This site provides examples of test questions used on Smarter Balanced assessments in English language
        arts/literacy and math. Teachers, parents, students, administrators, and policymakers can experience these test items just as students encounter them.

        <br /><br />

                These samples are not intended to be used as practice tests, but educators can use them to better
        understand how Smarter Balanced measures college- and career-ready content.
    </div>

            <br />

            <div className="text-center">
                <NavLink to={'/BrowseItems'} exact activeClassName='active' className="btn-lg btn-primary home-container-button">
                    <span>Browse Test Items</span>
                </NavLink>
          

            <br /><br />
            <NavLink to={'/AboutItems'} exact activeClassName='active' className="btn-lg btn-success home-container-button">
                    <span>Learn More About Items</span>
            </NavLink>
                
    </div >
</div >

    }
}
