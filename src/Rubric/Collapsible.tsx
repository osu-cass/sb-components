import * as React from "react";

export interface CollapsibleProps {
  className?: string;
  style?: React.CSSProperties;
  label: string;
}

export interface CollapsibleState {
  isCollapsed: boolean;
}

export class Collapsible extends React.Component<
  CollapsibleProps,
  CollapsibleState
> {
  constructor(props: CollapsibleProps) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  render() {
    const label = (this.state.isCollapsed ? "▶ " : "▼ ") + this.props.label;
    const style: React.CSSProperties = this.state.isCollapsed
      ? { display: "none" }
      : {};

    return (
      <div
        role="tab"
        className={this.props.className}
        style={this.props.style}
        aria-expanded={!this.state.isCollapsed}
      >
        <a
          role="button"
          className="collapsible-label link-button"
          href="javascript:"
          onClick={() => this.toggleCollapsed()}
          tabIndex={0}
        >
          {label}
        </a>
        <div
          className="collapsible-body"
          style={style}
          aria-hidden={this.state.isCollapsed}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
