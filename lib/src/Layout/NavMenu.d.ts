import * as React from "react";
import { SbNavlinkProps } from "./SbNavLink";
export interface NavMenuProps {
    links?: SbNavlinkProps[];
    siteName: string;
    mainContentId: string;
}
export declare class NavMenu extends React.Component<NavMenuProps, {}> {
    renderLinks(): JSX.Element | undefined;
    handleKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => void;
    render(): JSX.Element;
}
