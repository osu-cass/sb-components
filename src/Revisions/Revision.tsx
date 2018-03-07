import * as React from "react";
import { ToolTip } from "../index";

export interface RevisionModel {
  author: string;
  date: string;
  commitMessage: string;
  commitHash: string;
}

export interface RevisionModelProps extends RevisionModel {
  selected: boolean;
  onClick: () => void;
}

// tslint:disable-next-line:variable-name
export const Revision: React.SFC<RevisionModelProps> = props => {
  const renderHelpText = () => {
    return (
      <div className="tool-tip-help-text">
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

  const date = new Date(props.date);

  return (
    <li key={props.commitHash}>
      <ToolTip
        toolTipHeader={`${date.toDateString()}-${date.toLocaleTimeString()}`}
        helpText={renderHelpText()}
      >
        <button className="btn btn-link revisions-link" onClick={props.onClick}>
          {props.commitHash}
        </button>
        <div className="revisions-details">
          {props.author}-
          {date.getMonth() + 1}/{date.getDate()}
        </div>
      </ToolTip>
    </li>
  );
};
