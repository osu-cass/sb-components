import * as React from "react";
import { ToolTip, getShortDateFormat, getLongDateFormat } from "../index";

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
        {props.commitHash}
      </div>
    );
  };

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
          {props.commitHash}
        </button>
        <div className="revisions-details">
          {props.author}-{getShortDateFormat(props.date)}
        </div>
      </ToolTip>
    </li>
  );
};
