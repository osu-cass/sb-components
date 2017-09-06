import * as React from 'react';
import * as ItemCardViewModel from '../ItemCardViewModel';

export interface Props {
    itemCardViewModel: ItemCardViewModel.ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
    educationalDifficulty: string;
    evidenceStatement: string;
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

    renderInformationDetails() {
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

    render() {
        return (
            <div>{this.renderInformationDetails()}</div>
        );
    }
}