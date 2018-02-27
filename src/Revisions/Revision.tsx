import * as React from "react";
import { ToolTip } from "../index";

export interface RevisionModel {
  author: string;
  date: Date;
  commitMessage: string;
  commitHash: string;
}

export interface RevisionModelProps extends RevisionModel {
  selected: boolean;
  onClick: (revision: string) => void;
}

// tslint:disable-next-line:variable-name
export const Revision: React.SFC<RevisionModelProps> = props => {
  const renderHelpText = () => {
    return (
      <div>
        <b>Commit: </b>
        {props.commitMessage}
        <br />
        <b>Author: </b>
        {props.author}
        <br />
        <b>CommitHash: </b>
        {props.commitHash}
      </div>
    );
  };

  return (
    <li key={props.commitHash}>
      <ToolTip
        toolTipHeader={
          props.date.toDateString() + "-" + props.date.toLocaleTimeString()
        }
        helpText={renderHelpText()}
      >
        <button className="btn btn-link">{props.commitHash}</button>
        <div className="revisions-details">
          {props.author}-
          {props.date.getMonth() + 1}/{props.date.getDate()}
        </div>
      </ToolTip>
    </li>
  );
};
