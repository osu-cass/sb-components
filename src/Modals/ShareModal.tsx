import * as React from "react";
import * as ReactModal from "react-modal";

function getItemUrl(): string {
  return window === undefined ? "" : window.location.href;
}

export interface ShareModalProps {
  iSAAP: string;
  showModal?: boolean;
}

export interface ShareModalState {
  showModal: boolean;
}

export class ShareModal extends React.Component<
  ShareModalProps,
  ShareModalState
> {
  constructor(props: ShareModalProps) {
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

  copyToClipboard(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const input = document.getElementById("shareUrl") as HTMLTextAreaElement;
    input.select();
    document.execCommand("copy");
  }

  render() {
    let url = "";
    // tslint:disable-next-line:no-typeof-undefined
    if (typeof window !== "undefined") {
      url = getItemUrl();
    }

    return (
      <div>
        <button
          className="item-nav-btn btn btn-default btn-sm"
          role="button"
          tabIndex={0}
          onClick={this.handleShowModal}
          aria-label="Open Share Modal"
        >
          <span className="fa fa-share" aria-hidden="true" />
          Share
        </button>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Share Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content share-modal"
        >
          <div
            className="modal-wrapper"
            aria-labelledby="Share Modal"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h4 className="modal-title">Share</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close modal"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <span>
                The following URL can be used to load this question with your
                currently saved accessibility options.
              </span>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control readonly-select"
                  id="shareUrl"
                  style={{ maxWidth: "inherit" }}
                  readOnly={true}
                  value={decodeURIComponent(url)}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-default"
                    type="button"
                    id="copy-button"
                    onClick={this.copyToClipboard}
                  >
                    <span
                      className="glyphicon glyphicon-copy"
                      aria-hidden="true"
                    />
                    <span> Copy to clipboard</span>
                  </button>
                </span>
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
