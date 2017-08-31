import * as React from 'react';
import * as ItemCard from './ItemCard';
import * as ItemCardViewModel from './ItemCardViewModel'

export interface Props {
    itemCardViewModel: ItemCardViewModel.ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
    educationalDifficulty: string;
    evidenceStatement: string;
}

export class ItemInformation extends React.Component<Props, {}> {
    render() {
        return (
            <div className="modal fade"
                id="about-item-modal-container"
                tabIndex={-1} role="dialog"
                aria-labelledby="About Item Modal"
                aria-hidden="true">

                <div className="modal-dialog about-item-modal" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">About This Item</h4>
                        </div>
                        <div className="modal-body">
                            <ItemInformationDetail {...this.props} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" form="accessibility-form" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class ItemInformationDetail extends React.Component<Props, {}> {
    renderField(label: string, value: string | number, className: string): JSX.Element | null {
        if (!value) {
            return null;
        }

        return (
            <p className={`card-text ${className}`} tabIndex={0}>
                <span className="card-text-label">{label}</span>
                <span className="card-text-value"> {value}</span>
            </p>
        );
    }

    render() {

        return (
            <div className="item-information-content">
                {this.renderField("Subject", this.props.itemCardViewModel.subjectLabel, "subject")}
                {this.renderField("Grade", this.props.itemCardViewModel.gradeLabel, "grade")}
                {this.renderField("Claim", this.props.itemCardViewModel.claimLabel, "claim")}
                {this.renderField("Target", this.props.itemCardViewModel.target, "target")}
                {this.renderField("Item Type", this.props.itemCardViewModel.interactionTypeLabel, "interaction-type")}
                {this.renderField("Item Id", this.props.itemCardViewModel.itemKey, "item-id")}
                {this.renderField("Depth of Knowledge", this.props.depthOfKnowledge, "dok")}
                {this.renderField("Common Core State Standard", this.props.commonCoreStandardsDescription, "ccss")}
                {this.renderField("Target Description", this.props.targetDescription, "target-description")}
                {this.renderField("Educational Difficulty", this.props.educationalDifficulty, "educational-difficulty")}
                {this.renderField("Evidence Statement", this.props.evidenceStatement, "evidence-statement")}
            </div>
        );
    }
}