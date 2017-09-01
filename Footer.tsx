import * as React from 'react';

interface Props {
    gradeLevel: string,
    subject: string;
}

export class Component extends React.Component<Props, undefined> {
    render() {
        return (
            <div className='footer'>
                Smarter Balanced {this.props.gradeLevel} {this.props.subject} Practice Test Scoring Guide
            </div>
        );
    }
}