import * as React from "react";

export interface AccordionProps {
  accordionTitle: string;
  isOpen: boolean;
  toggleExpand: () => void;
}

export class Accordion extends React.Component<AccordionProps, {}> {
  constructor(props: AccordionProps) {
    super(props);
  }

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
    const { isOpen, accordionTitle, toggleExpand } = this.props;

    return (
      <div className="accordion-container">
        <div role="button" className="accordion-bar" onClick={toggleExpand}>
          <div className="accordion-content">
            {accordionTitle}
            {this.renderCarat(isOpen)}
          </div>
        </div>
        {this.renderContent(isOpen)}
      </div>
    );
  }
}
