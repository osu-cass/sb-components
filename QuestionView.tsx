import * as React from 'react';
import { Question } from '../Models';
import { ItemViewComponent } from './ItemView';
import { EvidenceStatement } from './EvidenceStatement';
import { QuestionDataTable } from './QuestionDataTable';

interface Props {
    question: Question
}

export class QuestionView extends React.Component<Props, {}> {
    render() {
        const data = this.props.question.data;

        const evidenceStatement = data && data.evidenceStatement
            ? <EvidenceStatement statement={data.evidenceStatement} />
            : null;
        
        const dataTable = data && data.itemCardViewModel
            ? <QuestionDataTable tableData={data.itemCardViewModel} />
            : null;
        
        return (
            <div className='item'>
                <h2>Question #{this.props.question.questionNumber}</h2>
                {dataTable}
                {evidenceStatement}
                <ItemViewComponent view={this.props.question.view} />
            </div>
        );
    }
}