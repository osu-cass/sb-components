import * as React from "react";
import { ToolTip, getShortDateFormat, getLongDateFormat } from "@src/index";

export interface RevisionModel {
  author: string;
  date: string;
  commitMessage: string;
  commitHash: string;
  selected: boolean;
}

export interface RevisionModelProps extends RevisionModel {
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

  function formatDate(s: string) {
    return s.slice(0, -4) + s.slice(-2);
  }

  function shortCommit(s: string) {
    return s.substring(s.length - 4, s.length);
  }

  return (
    <li key={props.commitHash}>
      <ToolTip
        toolTipHeader={getLongDateFormat(props.date)}
        helpText={renderHelpText()}
      >
        <button
          className={
            props.selected
              ? "btn btn-link revisions-link selected"
              : "btn btn-link revisions-link"
          }
          onClick={props.onClick}
        >
          {shortCommit(props.commitHash)}
        </button>
        <div className="revisions-details">
          {props.author}-{formatDate(getShortDateFormat(props.date))}
        </div>
      </ToolTip>
    </li>
  );
};
