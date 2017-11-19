import * as React from 'react'
import { ItemViewModel, ItemGroup } from "../Models";
import { PassageView } from './PassageView';
import { QuestionView } from './QuestionView';

interface Props {
    itemData: ItemGroup;
}

export class ItemPage extends React.Component<Props, {}> {
    render() {
        const passage = this.props.itemData.passage
            ? <PassageView 
                view={this.props.itemData.passage} 
                associatedItems={this.props.itemData.questions.map(q => q.id)} />
            : null;

        const questions = this.props.itemData.questions.map(q => 
            <QuestionView question={q} key={q.questionNumber} />
        );
        return (
            <div className='page'>
                {passage}
                {questions}
            </div>
        );
    }
}