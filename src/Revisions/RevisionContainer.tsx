import * as React from "react";
import { ToolTip } from "../index";
import { RevisionModel, Revision } from "./Revision";

export interface RevisionContainerProps {
  revisions: RevisionModel[];
  onRevisionSelect: (revision: string) => void;
}

export class RevisionContainer extends React.Component<
  RevisionContainerProps,
  {}
> {
  constructor(props: RevisionContainerProps) {
    super(props);
  }

  render() {
    const revisions = this.props.revisions.map(rev => (
      <Revision
        {...rev}
        selected={false}
        onClick={() => this.props.onRevisionSelect(rev.commitHash)}
        key={rev.commitHash}
      />
    ));

    return (
      <div className="revisions section-light">
        <h3 className="revisions-header">Revisions</h3>
        <ul>{revisions}</ul>
      </div>
    );
  }
}