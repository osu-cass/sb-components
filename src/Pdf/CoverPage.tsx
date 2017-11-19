import * as React from 'react';

export interface CoverPageProps {
    subject: string;
    grade: string;
    date?: {
        getMonth: () => string;
        getDate: ()  => string;
        getFullYear:  () => string;
    }
}

export class CoverPage extends React.Component<CoverPageProps, {}> {
    render() {
        // the data prop is for snapshot testing
        const today = this.props.date ? this.props.date : new Date();
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