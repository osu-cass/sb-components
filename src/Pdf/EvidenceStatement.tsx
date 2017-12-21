import * as React from "react";

export interface EvidenceStatementProps {
  statement: string;
}

export class EvidenceStatement extends React.Component<
  EvidenceStatementProps,
  {}
> {
  render() {
    return (
      <div className="centered-table-container">
        <table className="item-data-table">
          <thead>
            <tr>
              <th>Evidence Statement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.statement}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
