import * as React from "react";

export interface ToolTipProps {
  toolTipHeader?: string;
  helpText?: string;
  displayIcon?: boolean;
  position?: "top" | "bottom";
}

export class ToolTip extends React.Component<ToolTipProps, {}> {
  constructor(props: ToolTipProps) {
    super(props);
  }

  renderToolTipHeader() {
    if (this.props.toolTipHeader) {
      return (
        <div className="tool-tip-header">
          <h3 className="tool-tip-link-header">{this.props.toolTipHeader}</h3>
        </div>
      );
    }
  }

  renderToolTipVisibleText() {
    const icon = this.props.displayIcon ? (
      <span className="fa fa-info-circle fa-sm" aria-hidden="true" />
    ) : (
      undefined
    );

    return (
      <div className="tool-tip-hoverable">
        {this.props.children} {icon}
      </div>
    );
  }

  renderToolTipHelpText() {
    if (this.props.helpText) {
      return (
        <div className={"tool-tip-message " + this.props.position}>
          {this.renderToolTipHeader()}
          <div className="tool-tip-help-text">{this.props.helpText}</div>
        </div>
      );
    }
  }

  renderToolTip() {
    return (
      <div className="tool-tip-links" tabIndex={0}>
        {this.renderToolTipVisibleText()}
        <div className="tool-tip-details">{this.renderToolTipHelpText()}</div>
      </div>
    );
  }

  render() {
    return <div>{this.renderToolTip()}</div>;
  }
}
