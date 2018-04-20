import * as React from "react";
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
export declare const Revision: React.SFC<RevisionModelProps>;
