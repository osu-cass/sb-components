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
    renderRubric(rubric: Rubric, index: number) {

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

        const leftAlign = {
            textAlign: "left"
        }

        const rowsJsx = rows.map(row => 
            <tr key={row.score}>
                <td>{row.score}</td>
                <td dangerouslySetInnerHTML={{__html: row.rationale}} style={leftAlign}></td>
                {showSample ? <td dangerouslySetInnerHTML={{__html: row.sample}} style={leftAlign}></td> : null}
            </tr>
        );

        return (
            <table className='item-data-table' key={index}>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Rationale</th>
                        {showSample ? <th>Exemplar</th> : null}
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
                {this.props.rubrics.map((r, i) => this.renderRubric(r, i))}
            </div>
        );
    }
}