import * as React from 'react'
import { ItemPdfModel, ItemGroupModel } from "./PdfModels";
import { PassageView } from './PassageView';
import { QuestionView } from './QuestionView';

export interface ItemViewContainerProps {
    itemData: ItemGroupModel;
}

export class ItemViewContainer extends React.Component<ItemViewContainerProps, {}> {
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