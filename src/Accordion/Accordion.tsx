import * as React from "react";

export interface AccordionProps {
  accordionTitle: string;
  contentItem: JSX.Element;
}

export interface AccordionState {
  title: string;
  isOpen: boolean;
}

export class Accordion extends React.Component<AccordionProps, AccordionState> {
  constructor(props: AccordionProps) {
    super(props);

    this.state = { title: this.props.accordionTitle, isOpen: false };
  }

  handleShowContent = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderContent(isOpen: boolean): JSX.Element | undefined {
    let content: JSX.Element | undefined;

    if (isOpen) {
      content = (
        <div className="accordion-content">{this.props.contentItem}</div>
      );
    }

    return content;
  }

  renderCarat(isOpen: boolean): JSX.Element | undefined {
    let content: JSX.Element | undefined;

    if (isOpen) {
      content = <i className="fa fa-chevron-up carat" />;
    } else {
      content = <i className="fa fa-chevron-down carat" />;
    }

    return content;
  }

  render() {
    return (
      <div className="accordion-container">
        <div className="accordion-bar" onClick={this.handleShowContent}>
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
