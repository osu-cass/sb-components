import * as React from "react";
import { AboutItemRevisionModel } from "./AboutItemModels";

export class AboutThisItemRevision extends React.Component<
  AboutItemRevisionModel,
  {}
> {
  renderField(
    label: string,
    className: string,
    value?: string | number
  ): JSX.Element | null {
    if (!value) {
      return null;
    }

    return (
      <p className={`card-text ${className}`} tabIndex={0}>
        <span className="card-text-label">{label}:</span>
        <span className="card-text-value"> {value}</span>
      </p>
    );
  }

  // tslint:disable: max-func-body-length
  render() {
    const { AboutItemMetadata } = this.props;
    return (
      <div className={"item-details"}>
        {this.renderField(
          "Identifier",
          "identifier",
          AboutItemMetadata.identifier
        )}
        {this.renderField(
          "Item Author",
          "item-author",
          AboutItemMetadata.itemAuthorIdentifier
        )}
        {this.renderField(
          "itemSpecFormat",
          "item-spec-format",
          AboutItemMetadata.itemSpecFormat
        )}
        {this.renderField(
          "Security Status",
          "security-status",
          AboutItemMetadata.securityStatus
        )}
        {this.renderField(
          "Item Description",
          "item-description",
          AboutItemMetadata.smarterAppItemDescriptor
        )}
        {this.renderField("Status", "status", AboutItemMetadata.status)}
        {this.renderField(
          "Stimulus Format",
          "stimulus-format",
          AboutItemMetadata.stimulusFormat
        )}
        {this.renderField("Subject", "subject", AboutItemMetadata.subject)}
        {this.renderField("Version", "version", AboutItemMetadata.version)}
        {this.renderField(
          "Intended Grade",
          "intended-grade",
          AboutItemMetadata.intendedGrade
        )}
        {this.renderField(
          "Minimum Grade",
          "minimum-grade",
          AboutItemMetadata.minimumGrade
        )}
        {this.renderField(
          "Maximum Grade",
          "maximum-grade",
          AboutItemMetadata.maximumGrade
        )}
        {this.renderField(
          "Interaction Type",
          "interaction-type",
          AboutItemMetadata.interactionType
        )}
        {this.renderField(
          "Maximum Points",
          "max-points",
          AboutItemMetadata.maximumNumberOfPoints
        )}
        {this.renderField(
          "Allow Calculator",
          "allow-calculator",
          AboutItemMetadata.allowCalculator
        )}
        {this.renderField(
          "Copyright and other restrictions",
          "copy-other-restrict",
          AboutItemMetadata.copyrightAndOtherRestrictions
        )}
        {this.renderField(
          "brailleType",
          "braille-type",
          AboutItemMetadata.brailleType
        )}
        {this.renderField(
          "enemyItem",
          "enemy-item",
          AboutItemMetadata.enemyItem
        )}
        {this.renderField(
          "Publication",
          "publication",
          AboutItemMetadata.standardPublication.primaryStandard
        )}
        {this.renderField(
          "Primary Standard",
          "primary-standard",
          AboutItemMetadata.standardPublication.publication
        )}
        {this.renderField(
          "associatedTutorial",
          "associated-tutorial",
          AboutItemMetadata.associatedTutorial
        )}
        {this.renderField(
          "Associated Wordlist",
          "associated-wordlist",
          AboutItemMetadata.associatedWordlist
        )}
        {this.renderField("language", "language", AboutItemMetadata.language)}
      </div>
    );
  }
}
