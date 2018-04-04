import * as React from "react";
import * as ReactModal from "react-modal";
import { ItemViewerFrame } from "@src/index";

/**
 * @export
 * @interface IframeModalProps
 */
export interface IframeModalProps {
  url: string;
  title: string;
  btnText?: string;
  btnClass?: string;
  btnIcon?: string;
  showModal?: boolean;
}

/**
 * @export
 * @interface IframeModalState
 */
export interface IframeModalState {
  showModal: boolean;
}

/**
 * Renders Iframe content within a modal component.
 * @export
 * @class IframeModal
 * @extends {React.Component<IframeModalProps, IframeModalState>}
 */
export class IframeModal extends React.Component<
  IframeModalProps,
  IframeModalState
> {
  constructor(props: IframeModalProps) {
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

  renderOpenButton() {
    const { btnClass, btnIcon, btnText, title } = this.props;
    let iconTag: JSX.Element | undefined;
    const btnClassText = btnClass || "btn btn-default btn-sm";
    if (btnIcon) {
      iconTag = <span aria-hidden="true" className={btnIcon} />;
    }

    return (
      <button
        className={btnClassText}
        role="button"
        tabIndex={0}
        onClick={this.handleShowModal}
        aria-label={`Open ${title} Modal`}
      >
        {iconTag}
        {this.props.btnText || "Open"}
      </button>
    );
  }

  renderHeader() {
    return (
      <div className="modal-header">
        <h4 className="modal-title">{this.props.title}</h4>
        <button
          className="close"
          onClick={this.handleHideModal}
          aria-label="Close modal"
        >
          <span className="fa fa-times" aria-hidden="true" />
        </button>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className="modal-footer">
        <button
          className="btn btn-primary"
          aria-label="Close modal"
          onClick={this.handleHideModal}
        >
          Close
        </button>
      </div>
    );
  }

  renderModalWrapper() {
    return (
      <div
        className="modal-wrapper"
        aria-labelledby={`${this.props.title} Modal`}
        aria-hidden="true"
      >
        {this.renderHeader()}
        <div className="modal-body">
          <ItemViewerFrame {...this.props} />
        </div>
        {this.renderFooter()}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderOpenButton()}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel={`${this.props.title} Modal`}
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content iframe-modal"
        >
          {this.renderModalWrapper()}
        </ReactModal>
      </div>
    );
  }
}
