import * as React from "react";

export interface ToolTipState {
  shown: boolean;
}

export class ToolTip extends React.Component<{}, ToolTipState> {
  constructor() {
    super({});

    this.state = {
      shown: false
    };
  }

  showTip = () => this.setState({ shown: true });
  hideTip = () => this.setState({ shown: false });

  render() {
    if (!this.props.children) {
      return null;
    }

    const toolTipJSX = this.state.shown ? (
      <span className="tool-tip">{this.props.children}</span>
    ) : null;
    return (
      <span
        className="fa fa-info-circle fa-sm"
        onMouseEnter={this.showTip}
        onMouseLeave={this.hideTip}
        onSelect={this.showTip}
        onBlur={this.hideTip}
      />
    );
  }
}
