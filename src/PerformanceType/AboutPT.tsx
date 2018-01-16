import * as React from "react";
import { getSubjectHeader } from "./PerformanceModels";
import * as ReactModal from "react-modal";

export interface AboutPTModalProps {
  subject: string;
  description: string;
  showModal?: boolean;
}

export interface AboutPTModalState {
  showModal: boolean;
}
export class AboutPTModal extends React.Component<
  AboutPTModalProps,
  AboutPTModalState
> {
  constructor(props: AboutPTModalProps) {
    super(props);

    this.state = {
      showModal: this.props.showModal || false
    };
  }

  renderAboutPt() {
    return (
      <p>
        <b>Performance tasks</b> measure a student’s ability to demonstrate
        critical-thinking and problem-solving skills. Performance tasks
        challenge students to apply their knowledge and skills to respond to
        complex real-world problems. They can be best described as collections
        of questions and activities that are coherently connected to a single
        theme or scenario. These activities are meant to measure capacities such
        as depth of understanding, writing and research skills, and complex
        analysis, which cannot be adequately assessed with traditional
        assessment questions. The performance tasks are taken on a computer (but
        are not computer adaptive) and will take one to two class periods to
        complete.
      </p>
    );
  }

  renderDescription(ptHeader: string) {
    return (
      <p aria-labelledby={`${ptHeader}`}>
        <b>{ptHeader}</b>
        <span dangerouslySetInnerHTML={{ __html: this.props.description }} />
      </p>
    );
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const header = getSubjectHeader(this.props.subject);

    return (
      <div>
        <button
          className="item-nav-btn btn btn-default btn-sm about-pt-btn"
          role="button"
          tabIndex={0}
          onClick={this.handleShowModal}
          aria-label="About Performance Task"
        >
          <span className="fa fa-info-circle" aria-hidden="true" />
          <span className="item-nav-long-label">This is a </span>
          <b> Performance Task</b>
        </button>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel={header}
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content about-pt-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="About Performance Tasks"
            aria-describedby="About Performance Tasks"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">{header}</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              {this.renderAboutPt()}
              {this.renderDescription(header)}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                aria-label="Close modal"
                onClick={this.handleHideModal}
              >
                Close
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
