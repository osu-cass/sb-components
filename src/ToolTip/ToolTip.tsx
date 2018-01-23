import * as React from "react";

export enum ToolTipPosition {
  left = "left",
  right = "right",
  bottom = "bottom",
  top = "top"
}

export interface ToolTipProps {
  helpText?: string;
  displayIcon?: boolean;
  position?: "top" | "bottom";
}

export interface ToolTipState {
  shown: boolean;
}

export class ToolTip extends React.Component<ToolTipProps, ToolTipState> {
  constructor(props: ToolTipProps) {
    super(props);

    this.state = {
      shown: false
    };
  }

  showTip = () => this.setState({ shown: true });
  hideTip = () => this.setState({ shown: false });

  render() {
    if (!this.props.helpText) {
      return null;
    }

    const toolTipJSX = this.state.shown
      ? [<span className="tool-tip">{this.props.helpText}</span>]
      : null;
    return (
      <span
        // onMouseEnter={this.showTip}
        // onMouseLeave={this.hideTip}
        onClick={this.showTip}
        // onSelect={this.showTip}
        // onBlur={this.hideTip}
        tabIndex={0}
      >
        {this.props.children} <span className="fa fa-info-circle fa-sm" />
        {toolTipJSX}
      </span>
    );
  }
}
