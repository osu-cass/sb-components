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
      return null;
    }

    const position = this.props.position || "top";
    const shown = this.state.hovered || this.state.focused ? "shown" : "";

    const icon = this.props.displayIcon ? (
      <span className="fa fa-info-circle fa-sm" />
    ) : null;

    return (
      <span
        className={"tool-tip " + position + " " + shown}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}
        onFocus={this.onFocus}
        onBlur={this.offFocus}
        tabIndex={0}
        tool-tip-data={this.props.helpText}
      >
        {this.props.children} {icon}
      </span>
    );
  }
}
