import * as React from "react";

export interface ToolTipProps {
  helpText?: string;
  displayIcon?: boolean;
  position?: "top" | "bottom";
}

export interface ToolTipState {
  hovered: boolean;
  focused: boolean;
}

export class ToolTip extends React.Component<ToolTipProps, ToolTipState> {
  constructor(props: ToolTipProps) {
    super(props);

    this.state = {
      hovered: false,
      focused: false
    };
  }

  onHover = () => this.setState({ hovered: true });
  offHover = () => this.setState({ hovered: false });
  onFocus = () => this.setState({ focused: true });
  offFocus = () => this.setState({ focused: false });

  render() {
    if (!this.props.helpText) {
      return <span> {this.props.children}</span>;
    }

    const position = this.props.position || "top";
    const shown = this.state.focused || this.state.hovered;

    const icon = this.props.displayIcon ? (
      <span className="fa fa-info-circle fa-sm" />
    ) : null;

    const toolTipContent = shown ? (
      <div className={"tool-tip-before " + position}>{this.props.helpText}</div>
    ) : null;
    const toolTipArrow = shown ? (
      <div className={"tool-tip-after " + position} />
    ) : null;

    return (
      <span className={"tool-tip " + position}>
        {toolTipContent}
        <span
          className="tool-tip-hoverable"
          onMouseEnter={this.onHover}
          onMouseLeave={this.offHover}
          onFocus={this.onFocus}
          onBlur={this.offFocus}
          tabIndex={0}
        >
          {this.props.children} {icon}
        </span>
        {toolTipArrow}
      </span>
    );
  }
}
