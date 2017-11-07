import * as React from 'react';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    label: string;
}

interface State {
    isCollapsed: boolean;
}

export class CComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isCollapsed: true
        }
    }

    toggleCollapsed() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }

    render() {
        let label = (this.state.isCollapsed ? "▶ " : "▼ ") + this.props.label;
        let style: React.CSSProperties = this.state.isCollapsed ? { display: "none" } : {};

        return (
            <div className={this.props.className} style={this.props.style} aria-expanded={!this.state.isCollapsed}>
                <a role="button" className="collapsible-label link-button" href="#" onClick={() => this.toggleCollapsed()} tabIndex={0}>
                    {label}
                </a>
                <div className="collapsible-body" style={style} aria-hidden={this.state.isCollapsed}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
