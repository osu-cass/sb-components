import * as React from "react";
import * as Collapsible from "../Rubric/Collapsible";
import { AboutItemModel } from "./AboutItemModels";
import { AboutThisItemDetail } from "./AboutItemDetail";
import { Rubric } from "../Rubric/Rubric";
import * as ReactModal from "react-modal";

export interface AboutItemProps extends AboutItemModel {
  showModal?: boolean;
  showRubrics?: boolean;
}

export interface AboutItemState {
  showModal: boolean;
}

export class AboutItem extends React.Component<AboutItemProps, AboutItemState> {
  constructor(props: AboutItemProps) {
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

  private renderRubrics(): JSX.Element | undefined {
    const { sampleItemScoring, showRubrics } = this.props;
    let content: JSX.Element | undefined;

    if (showRubrics && sampleItemScoring && sampleItemScoring.rubrics) {
      // TODO: add logic for non rubrics
      const rubrics = sampleItemScoring.rubrics.map((ru, i) => (
        <Rubric {...ru} key={String(i)} />
      ));

      content = <div className="rubric">{rubrics}</div>;
    }

    return content;
  }

  render() {
    return (
      <div>
        <button
          className="item-nav-btn btn btn-default btn-sm about-item-btn"
          role="button"
          tabIndex={0}
          onClick={this.handleShowModal}
          aria-label="Open About This Item Modal"
        >
          <span
            className="glyphicon glyphicon-info-sign glyphicon-pad"
            aria-hidden="true"
          />
          About <span className="item-nav-long-label">This Item</span>
        </button>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="About This Item Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content about-item-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="About Item Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">About This Item</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <AboutThisItemDetail {...this.props} />
              {this.renderRubrics()}
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
