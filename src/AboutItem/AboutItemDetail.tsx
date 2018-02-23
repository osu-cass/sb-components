import * as React from "react";
import { AboutItemModel } from "./AboutItemModels";

export class AboutThisItemDetail extends React.Component<AboutItemModel, {}> {
  renderField(
    label: string,
    className: string,
    value?: string | number
  ): JSX.Element | undefined {
    if (!value) {
      return undefined;
    }

    return (
      <p className={`card-text ${className}`} tabIndex={0}>
        <span className="card-text-label">{label}:</span>
        <span className="card-text-value"> {value}</span>
      </p>
    );
  }

  render() {
    return (
      <div className={"item-details"}>
        {this.renderField(
          "Subject",
          "subject",
          this.props.itemCardViewModel.subjectLabel
        )}
        {this.renderField(
          "Grade",
          "grade",
          this.props.itemCardViewModel.gradeLabel
        )}
        {this.renderField(
          "Claim",
          "claim",
          this.props.itemCardViewModel.claimLabel
        )}
        {this.renderField(
          "Target",
          "target",
          this.props.itemCardViewModel.targetShortName
        )}
        {this.renderField(
          "Item Type",
          "interaction-type",
          this.props.itemCardViewModel.interactionTypeLabel
        )}
        {this.renderField(
          "Item Id",
          "item-id",
          this.props.itemCardViewModel.itemKey
        )}
        {this.renderField(
          "Depth of Knowledge",
          "dok",
          this.props.depthOfKnowledge
        )}
        {this.renderField(
          "Common Core State Standard",
          "ccss",
          this.props.commonCoreStandardsDescription
        )}
        {this.renderField(
          "Target Description",
          "target-description",
          this.props.targetDescription
        )}
        {this.renderField(
          "Educational Difficulty",
          "educational-difficulty",
          this.props.educationalDifficulty
        )}
        {this.renderField(
          "Evidence Statement",
          "evidence-statement",
          this.props.evidenceStatement
        )}
      </div>
    );
  }
}
