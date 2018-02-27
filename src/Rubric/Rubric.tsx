import * as React from "react";
import { Collapsible } from "./Collapsible";
import { RubricEntry } from "./RubricEntry";
import { RubricModel } from "./RubricModels";
import { SampleResponse } from "./SampleResponse";

export class Rubric extends React.Component<RubricModel, {}> {
  renderRubrics() {
    const rubricEntries = this.props.rubricEntries.map((re, i) => (
      <RubricEntry {...re} key={String(i)} />
    ));
    if (rubricEntries.length === 0) {
      return undefined;
    }

    return (
      <div>
        <h4>Rubrics</h4>
        {rubricEntries}
      </div>
    );
  }

  renderSampleResponses() {
    const rubricSamples: JSX.Element[] = [];
    let i: number = 0;

    for (const sample of this.props.samples) {
      const key = `${i}:`;
      const responses = sample.sampleResponses.map((sr, idx) => (
        <SampleResponse {...sr} key={key + String(idx)} />
      ));
      rubricSamples.push(...responses);
      i += 1;
    }

    if (rubricSamples.length === 0) {
      return undefined;
    }

    return (
      <div>
        <h4>Sample Responses</h4>
        {rubricSamples}
      </div>
    );
  }

  render() {
    const label = `${this.props.language} Rubric`;

    return (
      <Collapsible label={label}>
        {this.renderRubrics()}
        {this.renderSampleResponses()}
      </Collapsible>
    );
  }
}
