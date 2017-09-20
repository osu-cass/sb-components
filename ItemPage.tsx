import * as React from 'react'
import { ItemViewModel, ItemGroup } from "../Models";
import { QuestionDataTable } from './QuestionDataTable';
import { ItemComponent } from "./Item";

interface Props {
    itemData: ItemGroup;
}

export class ItemPage extends React.Component<Props, {}> {
    renderPassage() {
        if (!this.props.itemData.passage) {
            return null;
        }
        return (
            <ItemComponent 
                view={this.props.itemData.passage} 
                data={this.props.itemData.questions[0].data} />
        );
    }

    renderQuestions() {
        return this.props.itemData.questions.map(q => (
            <ItemComponent 
                view={q.view} 
                data={q.data} 
                questionNumber={q.questionNumber} 
                key={q.questionNumber} />
        ));
    }

    render() {
        return (
            <div className='page'>
                {this.renderPassage()}
                {this.renderQuestions()}
            </div>
        );
    }
}