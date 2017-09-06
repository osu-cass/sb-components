import * as React from 'react';
import * as ItemCardViewModel from '../ItemCardViewModel'
import * as ItemInformationDetail from './ItemInformationDetail';

export interface Props {
    itemCardViewModel: ItemCardViewModel.ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
    educationalDifficulty: string;
    evidenceStatement: string;
}

export class ItemInformation extends React.Component<Props, {}> {
    renderInformation() {
        return (
            <div className="modal-dialog about-item-modal" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">About This Item</h4>
                    </div>
                    <div className="modal-body">
                        <ItemInformationDetail.ItemInformationDetail 
                            itemCardViewModel={this.props.itemCardViewModel}
                            depthOfKnowledge={this.props.depthOfKnowledge}
                            targetDescription={this.props.targetDescription}
                            commonCoreStandardsDescription={this.props.commonCoreStandardsDescription}
                            educationalDifficulty={this.props.educationalDifficulty}
                            evidenceStatement={this.props.evidenceStatement}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" form="accessibility-form" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="modal fade"
                id="about-item-modal-container"
                tabIndex={-1} role="dialog"
                aria-labelledby="About Item Modal"
                aria-hidden="true">
                {this.renderInformation()};
            </div>
        );
    }
}