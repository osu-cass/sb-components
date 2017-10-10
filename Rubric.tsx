import * as React from 'react';
import { Rubric } from '../Models';

interface Props {
    rubrics: Rubric[];
}

interface TableRow {
    score: string;
    rationale: string;
    sample: string;
}

export class RubricComponent extends React.Component<Props, {}> {
    renderRubric(rubric: Rubric) {
        let purpose = "Exemplar";
        if (rubric.samples[0] && 
            rubric.samples[0].sampleResponses[0] && 
            rubric.samples[0].sampleResponses[0].purpose) {

            purpose = rubric.samples[0].sampleResponses[0].purpose;
        }

        const rows = rubric.rubricEntries.map(entry => {
            const sample = rubric.samples.find(s => 
                s.sampleResponses[0] && s.sampleResponses[0].scorePoint == entry.scorepoint
            )
            const sampleHtml = sample
                ? sample.sampleResponses.map(sr => sr.sampleContent).join('<br/>')
                : "";
            return {
                score: entry.scorepoint,
                rationale: entry.value,
                sample: sampleHtml
            } as TableRow;
        });

        const showSample = rubric.samples.length !== 0;

        const rowsJsx = rows.map(row => 
            <tr>
                <td>{row.score}</td>
                <td dangerouslySetInnerHTML={{__html: row.rationale}}></td>
                {showSample ? <td dangerouslySetInnerHTML={{__html: row.sample}}></td> : null}
            </tr>
        );

        return (
            <table className='item-data-table'>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Rationale</th>
                        {showSample ? <th>{purpose}</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {rowsJsx}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                {this.props.rubrics.map(r => this.renderRubric(r))}
            </div>
        );
    }
}