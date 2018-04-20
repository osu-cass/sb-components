import * as React from "react";
export interface ToolTipProps {
    toolTipHeader?: string;
    helpText?: JSX.Element;
    displayIcon?: boolean;
    position?: "top" | "bottom";
    side?: "left" | "right";
    className?: string;
}
/**
 * A11y friendly tooltip
 * Can display a complicated or a simplified view
 * @export
 * @class ToolTip
 * @extends {React.Component<ToolTipProps, {}>}
 */
export declare class ToolTip extends React.Component<ToolTipProps, {}> {
    constructor(props: ToolTipProps);
    renderToolTipHeader(): JSX.Element | undefined;
    renderToolTipVisibleText(): JSX.Element;
    renderToolTipHelpText(): JSX.Element | undefined;
    render(): JSX.Element;
}
