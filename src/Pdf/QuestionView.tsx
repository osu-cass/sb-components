import * as React from 'react';
import { Question, AboutItemViewModel } from '../Models';
import { ItemViewComponent } from './ItemView';
import { EvidenceStatement } from './EvidenceStatement';
import { QuestionDataTable } from './QuestionDataTable';
import { RubricComponent } from './Rubric';

interface Props {
    question: Question
}

export class QuestionView extends React.Component<Props, {}> {
    renderRubric(data: AboutItemViewModel) {
        let rubric: JSX.Element;
        if (data && data.sampleItemScoring && data.sampleItemScoring.rubrics) {
            const entries = data.sampleItemScoring.rubrics
                .map(r => r.rubricEntries)
                .reduce((acc, re) => acc.concat(re), []);
            const samples = data.sampleItemScoring.rubrics
                .map(r => r.samples)
                .reduce((acc, sample) => acc.concat(sample), []);

            if (entries.length > 1 || samples.length > 1) {
                rubric = <RubricComponent rubrics={data.sampleItemScoring.rubrics} />;
            } else {
                const entriesJsx = samples.length > 0
                    ? <div><b>Rubric:</b> ({entries[0].scorepoint} point) {entries[0].value}</div>
                    : null;
                const samplesJsx = samples.length > 0
                    ? <div><b>Exemplar:</b> {samples[0]}</div>
                    : null;
            
                rubric = <div>{samplesJsx} {entriesJsx}</div>;
            }
        }

        return rubric;
    }

    render() {
        const data = this.props.question.data;

        const evidenceStatement = data && data.evidenceStatement
            ? <EvidenceStatement statement={data.evidenceStatement} />
            : null;
        
        const dataTable = data && data.itemCardViewModel
            ? <QuestionDataTable tableData={data.itemCardViewModel} />
            : null;

        const key = data && data.sampleItemScoring && data.sampleItemScoring.answerKey
            ? <div><b>Key:</b> {data.sampleItemScoring.answerKey}</div>
            : null;
        
        return (
            <div className='item'>
                <h2>Question #{this.props.question.questionNumber}</h2>
                {dataTable}
                {evidenceStatement}
                <ItemViewComponent view={this.props.question.view} />
                {key}
                {this.renderRubric(data)}
            </div>
        );
    }
}