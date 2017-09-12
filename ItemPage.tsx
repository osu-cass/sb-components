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
            <ItemComponent view={this.props.itemData.passage} />
        );
    }

    renderQuestions() {
        return this.props.itemData.questions.map(q => (
            <div key={q.id} >
                {q.data ? (<QuestionDataTable tableData={q.data.itemCardViewModel}/>) : null}
                <h2>Question #{q.questionNumber}</h2>
                <ItemComponent view={q.view} />
            </div>
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