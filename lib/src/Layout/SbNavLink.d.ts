import * as React from "react";
export interface SbNavlinkProps {
    url: string;
    name: string;
}
export declare class SbNavLink extends React.Component<SbNavlinkProps, {}> {
    removeFocus: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    render(): JSX.Element;
}
