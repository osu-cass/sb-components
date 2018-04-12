import * as Boostrap from "bootstrap";
import * as $ from "jquery";
import * as React from "react";
import { getSubjectHeader, shouldShowOnLoad } from "./PerformanceModels";
import * as ReactModal from "react-modal";

export interface AboutPtPopupModalProps {
  subject: string;
  description: string;
  isPerformance: boolean;
  showModal?: boolean;
  skipCookie?: boolean;
}

export interface AboutPTPopupModalState {
  showModal: boolean;
}

export class AboutPTPopupModal extends React.Component<
  AboutPtPopupModalProps,
  AboutPTPopupModalState
> {
  constructor(props: AboutPtPopupModalProps) {
    super(props);
    const { isPerformance, subject } = this.props;
    const skipCookie = this.props.skipCookie || false;
    const cookieShouldShow = skipCookie
      ? false
      : shouldShowOnLoad(isPerformance, subject);

    this.state = {
      showModal: this.props.showModal || cookieShouldShow || false
    };
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const header = getSubjectHeader(this.props.subject);

    // tslint:disable:react-no-dangerous-html
    return (
      <div>
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
              <p
                aria-labelledby="description"
                dangerouslySetInnerHTML={{ __html: this.props.description }}
              />
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
    // tslint:enable:react-no-dangerous-html
  }
}
