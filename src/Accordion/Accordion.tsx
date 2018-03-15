import * as React from "react";

export interface AccordionProps {
  accordionTitle: string;
  isOpen: boolean;
}

export interface AccordionState {
  title: string;
  isOpen: boolean;
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
  constructor(props: AccordionProps) {
    super(props);

    this.state = {
      title: this.props.accordionTitle,
      isOpen: this.props.isOpen
    };
  }

  componentWillReceiveProps(nextProps: AccordionProps) {
    if (this.state.isOpen !== nextProps.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }

  handleShowContent = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderContent(isOpen: boolean): JSX.Element | undefined {
    let content: JSX.Element | undefined;

    if (isOpen) {
      content = <div className="accordion-content">{this.props.children}</div>;
    }

    return content;
  }

  renderCarat(isOpen: boolean): JSX.Element | undefined {
    let content: JSX.Element | undefined;

    if (isOpen) {
      content = <span className="fa fa-chevron-up carat" aria-hidden="true" />;
    } else {
      content = (
        <span className="fa fa-chevron-down carat" aria-hidden="true" />
      );
    }

    return content;
  }

  render() {
    return (
      <div className="accordion-container">
        <div
          role="button"
          className="accordion-bar"
          onClick={this.handleShowContent}
        >
          <div className="accordion-content">
            {this.state.title}
            {this.renderCarat(this.state.isOpen)}
          </div>
        </div>
        {this.renderContent(this.state.isOpen)}
      </div>
    );
  }
}
