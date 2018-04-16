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
export class ToolTip extends React.Component<ToolTipProps, {}> {
  constructor(props: ToolTipProps) {
    super(props);
  }

  renderToolTipHeader() {
    if (this.props.toolTipHeader) {
      return (
        <span className="tool-tip-header">
          <h3 className="tool-tip-link-header">{this.props.toolTipHeader}</h3>
        </span>
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
      <span className="tool-tip-hoverable">
        {this.props.children} {icon}
      </span>
    );
  }

  renderToolTipHelpText() {
    if (this.props.helpText) {
      return (
        <span
          className={`tool-tip-message ${this.props.position} ${
            this.props.side
          }`}
        >
          {this.renderToolTipHeader()}
          {this.props.helpText}
        </span>
      );
    }
  }

  render() {
    return (
      <span className={`tool-tip-links ${this.props.className}`} tabIndex={0}>
        {this.renderToolTipVisibleText()}
        <span className="tool-tip-details">{this.renderToolTipHelpText()}</span>
      </span>
    );
  }
}
