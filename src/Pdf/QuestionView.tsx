import * as React from "react";
import { ItemView } from "./ItemView";
import { EvidenceStatement } from "./EvidenceStatement";
import { ItemCardTable } from "../ItemCard/ItemCardTable";
import { RubricTable } from "../Rubric/RubricTable";
import { QuestionModel } from "./PdfModels";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { ScoringOptions } from "../Rubric/ScoringOptionsTable";

export interface QuestionViewProps {
  question: QuestionModel;
  displayScoreInfo: boolean;
}

export class QuestionView extends React.Component<QuestionViewProps, {}> {
  renderRubric(data?: AboutItemModel) {
    if (!this.props.displayScoreInfo) {
      return undefined;
    }
    let rubric: JSX.Element | undefined;
    if (data && data.sampleItemScoring && data.sampleItemScoring.rubrics) {
      const entries = data.sampleItemScoring.rubrics
        .map(r => r.rubricEntries)
        .reduce((acc, re) => acc.concat(re), []);
      const samples = data.sampleItemScoring.rubrics
        .map(r => r.samples)
        .reduce((acc, sample) => acc.concat(sample), []);

      if (entries.length > 1 || samples.length > 1) {
        rubric = <RubricTable rubrics={data.sampleItemScoring.rubrics} />;
      } else {
        const entriesJsx =
          samples.length > 0 ? (
            <div>
              <b>Rubric:</b> ({entries[0].scorepoint}point) {entries[0].value}
            </div>
          ) : (
            undefined
          );
        const samplesJsx =
          samples.length > 0 ? (
            <div>
              <b>Exemplar:</b> {samples[0]}
            </div>
          ) : (
            undefined
          );

        rubric = (
          <div>
            {samplesJsx} {entriesJsx}
          </div>
        );
      }
    }

    return rubric ? rubric : undefined;
  }

  render() {
    const data = this.props.question.data;

    const evidenceStatement =
      data && data.evidenceStatement ? (
        <EvidenceStatement statement={data.evidenceStatement} />
      ) : (
        undefined
      );

    const dataTable =
      data && data.itemCardViewModel ? (
        <ItemCardTable card={data.itemCardViewModel} />
      ) : (
        undefined
      );

    const scoringOptions =
      data &&
      data.sampleItemScoring &&
      data.sampleItemScoring.scoringOptions &&
      data.sampleItemScoring.scoringOptions.length > 0 ? (
        <ScoringOptions options={data.sampleItemScoring.scoringOptions} />
      ) : (
        undefined
      );

    const answerKey =
      data &&
      data.sampleItemScoring &&
      data.sampleItemScoring.answerKey &&
      this.props.displayScoreInfo ? (
        <div>
          <b>Key:</b> {data.sampleItemScoring.answerKey}
        </div>
      ) : (
        undefined
      );

    return (
      <div className="item">
        <p className="question-title">
          Question #{this.props.question.questionNumber}
        </p>
        {dataTable}
        {evidenceStatement}
        <ItemView view={this.props.question.view} />
        <hr />
        {answerKey}
        {this.renderRubric(data)}
        {scoringOptions}
      </div>
    );
  }
}
