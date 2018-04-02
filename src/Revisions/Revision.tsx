import * as React from "react";
import { ToolTip, getShortDateFormat, getLongDateFormat } from "@src/index";

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
        {props.commitHash.slice(0, 8)}
      </div>
    );
  };

  return (
    <li key={props.commitHash}>
      <ToolTip
        toolTipHeader={getLongDateFormat(props.date)}
        helpText={renderHelpText()}
      >
        <button className="btn btn-link revisions-link" onClick={props.onClick}>
          {props.commitHash.slice(0, 8)}
        </button>
        <div className="revisions-details">
          {props.author}-{getShortDateFormat(props.date)}
        </div>
      </ToolTip>
    </li>
  );
};
