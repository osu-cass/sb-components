import * as React from "react";
import { SbNavlinkProps } from "./SbNavLink";
export interface LayoutProps {
    children?: React.ReactNode;
    links?: SbNavlinkProps[];
    siteName: string;
}
export declare class Layout extends React.Component<LayoutProps, {}> {
    render(): JSX.Element;
}
