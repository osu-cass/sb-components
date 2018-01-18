import * as React from "react";
import * as ItemCardCondensed from "../ItemCard/ItemCardCondensed";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import * as ReactModal from "react-modal";
import { MoreLikeThisModel } from "./MoreLikeThisModels";

export interface Column {
  label: string;
  itemCards: ItemCardModel[];
}

export interface MoreLikeThisModalProps extends MoreLikeThisModel {
  showModal?: boolean;
}

export interface MoreLikeThisModalState {
  showModal: boolean;
}

export class MoreLikeThisModal extends React.Component<
  MoreLikeThisModalProps,
  MoreLikeThisModalState
> {
  constructor(props: MoreLikeThisModalProps) {
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

  renderColumn(column: Column | null) {
    if (!column || column.label === "NA") {
      return undefined;
    }

    const noneLabel = "No items found for this grade.";

    const items = column.itemCards.length
      ? column.itemCards.map(c => (
          <ItemCardCondensed.ItemCardCondensed
            key={`${c.bankKey}-${c.itemKey}`}
            {...c}
          />
        ))
      : noneLabel;

    return (
      <div className="more-like-this-column">
        <div>
          <h3>{column.label}</h3>
        </div>
        {items}
      </div>
    );
  }

  render() {
    return (
      <div>
        <button
          className="item-nav-btn btn btn-default btn-sm"
          role="button"
          tabIndex={0}
          onClick={this.handleShowModal}
          aria-label="More Like This Modal"
        >
          <span
            className="glyphicon glyphicon-th-large glyphicon-pad"
            aria-hidden="true"
          />
          More <span className="item-nav-long-label">Like This</span>
        </button>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="More Like This Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content more-like-this-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="More Like This"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">More Like This</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <div className="more-like-this">
                {this.renderColumn(this.props.gradeBelowItems)}
                {this.renderColumn(this.props.sameGradeItems)}
                {this.renderColumn(this.props.gradeAboveItems)}
              </div>
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
