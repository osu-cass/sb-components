import * as React from 'react';

export interface SampleResponse {
    purpose: string;
    scorePoint: string;
    name: string;
    sampleContent: string;
}

export interface RubricSample {
    maxValue: string;
    minValue: string;
    sampleResponses: SampleResponse[];
}

export interface RubricEntry {
    scorepoint: string;
    name: string;
    value: string;
}

export interface Rubric {
    language: string;
    rubricEntries: RubricEntry[];
    samples: RubricSample[];
}

export class RubricEntryComponent extends React.Component<RubricEntry, {}> {
    render() {
        const pointLabel = this.props.scorepoint === "1" ? "point" : "points";
        const label = `${this.props.name} (${this.props.scorepoint} ${pointLabel})`;
        return (
            <div dangerouslySetInnerHTML={{ __html: this.props.value }} />
        );
    }
}

export class SampleResponseComponent extends React.Component<SampleResponse, {}> {
    render() {
        const pointLabel = this.props.scorePoint == "1" ? "point" : "points";
        const label = `${this.props.name} (${this.props.scorePoint} ${pointLabel})`;
        return (
            <div className="sample-response">
                <b>Purpose: </b> {this.props.purpose} <br />
                <b>Sample Response: </b> <br />
                <div dangerouslySetInnerHTML={{ __html: this.props.sampleContent }} />
            </div>
        );
    }
}

export class RubricComponent extends React.Component<Rubric, {}> {

    renderRubrics() {
        const rubricEntries = this.props.rubricEntries.map((re, i) => <RubricEntryComponent {...re} key={String(i)} />);
        if (rubricEntries.length === 0) {
            return null;
        }

        let rubrics = (
            <div>
                <h4>Rubrics</h4>
                {rubricEntries}
            </div>
        );
        return rubrics;
    }

    renderSampleResponses() {
        let rubricSamples: JSX.Element[] = [];
        let i: number = 0;
        for (const sample of this.props.samples) {
            const key = `${i}:`;
            const responses = sample.sampleResponses.map((sr, idx) => <SampleResponseComponent {...sr} key={key + String(idx)} />);
            rubricSamples.push(...responses);
            i++;
        }
        if (rubricSamples.length === 0) {
            return null;
        }

        let sampleResponses = (
            <div>
                <h4>Sample Responses</h4>
                {rubricSamples}
            </div>
        );

        return sampleResponses;
    }

    render() {
        const label = `${this.props.language} Rubric`;
        return (
            <div className="item-information-content">
                {this.renderRubrics()}
                {this.renderSampleResponses()}
            </div>
        );
    }
}