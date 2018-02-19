import * as React from "react";

export interface ToolTipProps {
  toolTipHeader?: string;
  helpText?: string;
  displayIcon?: boolean;
  position?: "top" | "bottom";
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
        <div className={`tool-tip-message ${this.props.position}`}>
          {this.renderToolTipHeader()}
          <div
            className="tool-tip-help-text"
            dangerouslySetInnerHTML={{ __html: this.props.helpText }}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="tool-tip-links" tabIndex={0}>
        {this.renderToolTipVisibleText()}
        <div className="tool-tip-details">{this.renderToolTipHelpText()}</div>
      </div>
    );
  }
}
