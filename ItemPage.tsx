import * as React from 'react'
import { QuestionTableData, ItemGroup } from "../Models";
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
            <div>
                {q.tableData ? (<QuestionDataTable tableData={q.tableData}/>) : null}
                <ItemComponent view={q.view} />
            </div>
        ));
    }

    render() {
        return (
            <div className='item-page'>
                {this.renderPassage()}
                {this.renderQuestions()}
            </div>
        );
    }
}