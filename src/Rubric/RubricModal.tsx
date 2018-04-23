import * as React from "react";
import * as ReactModal from "react-modal";
import { RubricTableProps, RubricTable } from "./RubricTable";

export interface RubricModalProps extends RubricTableProps {
  showModal?: boolean;
}

export interface RubricModalState {
  showModal: boolean;
}

export class RubricModal extends React.Component<
  RubricModalProps,
  RubricModalState
> {
  constructor(props: RubricModalProps) {
    super(props);
    this.state = {
      showModal: this.props.showModal || false
    };
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <button
          className="item-nav-btn btn btn-default btn-sm rubric-btn"
          role="button"
          tabIndex={0}
          onClick={this.handleShowModal}
          aria-label="Open Rubric Modal"
        >
          <span className="fa fa-check-circle-o" aria-hidden="true" />
          Rubric
        </button>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Rubric Information Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content rubric-table-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="Rubric Information Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Rubric</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <RubricTable {...this.props} />
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
