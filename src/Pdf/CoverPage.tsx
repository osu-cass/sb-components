import * as React from "react";

export interface CoverPageProps {
  subject: string;
  grade: string;
  dateString?: string;
}

export class CoverPage extends React.Component<CoverPageProps, {}> {
  render() {
    const today = this.props.dateString || new Date().toLocaleDateString();

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
        <div className="first-page-date">{today}</div>
      </div>
    );
  }
}
