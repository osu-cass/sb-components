import '../Styles/modal.less';
import * as React from 'react';
import * as Collapsible from '../Rubric/Collapsible';
import { AboutItemModel } from './AboutItemModels';
import { Rubric } from '../Rubric/Rubric';
import { AboutThisItemDetail } from './AboutItemDetail';
import * as ReactModal from 'react-modal';

export interface AboutItemProps extends AboutItemModel {
    showModal?: boolean;

}

export interface AboutItemState {
    showModal: boolean;
}

export class AboutItem extends React.Component<AboutItemProps, AboutItemState> {
    constructor(props: AboutItemProps) {
        super(props);
        this.state = {
            showModal: this.props.showModal || false
        }
    }

    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    handleHideModal = () => {
        this.setState({ showModal: false });
    }

    private renderRubrics(){
        const rubrics = this.props.rubrics.map((ru, i) => <Rubric {...ru} key={String(i)} />);
        return <div className="rubric">{rubrics}</div>        
    }

    render() {
        return (
            <div>
                <button className="item-nav-btn btn btn-link"
                    role="button" tabIndex={0}
                    onClick={this.handleShowModal}
                    aria-label="Open About This Item Modal">
                    <span className="glyphicon glyphicon-info-sign glyphicon-pad" aria-hidden="true" />
                    About This Item
                </button>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="About This Item Modal"
                    onRequestClose={this.handleHideModal}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content about-item-modal">
                    
                    <div className="modal-wrapper"
                        aria-labelledby="About Item Modal"
                        aria-hidden="true">
                        <div className="modal-header">
                            <h4 className="modal-title">About This Item</h4>
                            <button className="close" onClick={this.handleHideModal} aria-label="Close modal">
                                <span className="fa fa-times" aria-hidden="true"></span></button>
                        </div>
                        <div className="modal-body">
                        <AboutThisItemDetail {...this.props} />
                        {this.renderRubrics()}

                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" 
                            aria-label="Close modal" onClick={this.handleHideModal}
                            >Close</button>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}
