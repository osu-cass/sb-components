import * as React from 'react';

interface Props {
    subject: string;
    grade: string;
}

export class FirstPage extends React.Component<Props, {}> {
    render() {
        const today = new Date();
        return (
            <div className="page first-page">
                <div className="first-page-title">
                    Smarter Balanced<br />
                    Assessment Consortium
                </div>
                <div className="first-page-subtitle">
                    {this.props.subject} Practice Test Scoring Guide<br />
                    <strong>{this.props.grade}</strong>
                </div>
                <div className="first-page-date">
                    {today.getMonth()}/{today.getDate()}/{today.getFullYear()}
                </div>
            </div>
        );
    }
}