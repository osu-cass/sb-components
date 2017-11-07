import * as React from 'react'
import * as AboutItemModels from '../AboutItem/AboutItemModels';
import * as RubricEntry from './RubricEntry';
import * as Collapsible from './Collapsible';
import * as SampleResponse from '../SampleResponse/SampleResponse';

export class RubricComponent extends React.Component<AboutItemModels.Rubric, {}> {

    renderRubrics() {
        const rubricEntries = this.props.rubricEntries.map((re, i) => <RubricEntry.RubricEntryComponent {...re} key={String(i)} />);
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
            const responses = sample.sampleResponses.map((sr, idx) => <SampleResponse.SampleResponseComponent {...sr} key={key + String(idx)} />);
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
            <Collapsible.CComponent label={label}>
                {this.renderRubrics()}
                {this.renderSampleResponses()}
            </Collapsible.CComponent>
        );
    }
}