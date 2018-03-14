import * as React from "react";
import { RevisionModel, Revision, ToolTip } from "../index";

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
        selected={rev.selected}
        onClick={() => this.props.onRevisionSelect(rev.commitHash)}
        key={rev.commitHash}
      />
    ));

    return (
      <div className="revisions section section-light section-compact">
        <h3 className="revisions-header">Revisions</h3>
        <ul>{revisions}</ul>
      </div>
    );
  }
}
