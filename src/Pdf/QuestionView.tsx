import * as React from 'react';
import { ItemView } from './ItemView';
import { EvidenceStatement } from './EvidenceStatement';
import { QuestionDataTable } from './QuestionDataTable';
import { RubricTable } from '../Rubric/RubricTable'
import { QuestionModel } from './PdfModels';
import {AboutItemModel} from '../AboutItem/AboutItemModels';

export interface QuestionViewProps {
    question: QuestionModel
}

export class QuestionView extends React.Component<QuestionViewProps, {}> {
    renderRubric(data?: AboutItemModel) {
        let rubric: JSX.Element | undefined = undefined;
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
                const entriesJsx = samples.length > 0
                    ? <div><b>Rubric:</b> ({entries[0].scorepoint} point) {entries[0].value}</div>
                    : null;
                const samplesJsx = samples.length > 0
                    ? <div><b>Exemplar:</b> {samples[0]}</div>
                    : null;
            
                rubric = <div>{samplesJsx} {entriesJsx}</div>;
            }
        }
        
        return (rubric) ? rubric : null;
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
                <ItemView view={this.props.question.view} />
                {key}
                {this.renderRubric(data)}
            </div>
        );
    }
}