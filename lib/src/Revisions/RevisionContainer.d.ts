import * as React from "react";
import { RevisionModel } from "@src/index";
export interface RevisionContainerProps {
    revisions: RevisionModel[];
    onRevisionSelect: (revision: string) => void;
}
export declare class RevisionContainer extends React.Component<RevisionContainerProps, {}> {
    constructor(props: RevisionContainerProps);
    render(): JSX.Element;
}
