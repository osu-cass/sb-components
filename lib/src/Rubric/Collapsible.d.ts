import * as React from "react";
export interface CollapsibleProps {
    className?: string;
    style?: React.CSSProperties;
    label: string;
}
export interface CollapsibleState {
    isCollapsed: boolean;
}
export declare class Collapsible extends React.Component<CollapsibleProps, CollapsibleState> {
    constructor(props: CollapsibleProps);
    toggleCollapsed(): void;
    render(): JSX.Element;
}
