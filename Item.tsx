import * as React from 'react';
import { ItemView, ViewType, AboutItemViewModel } from "../Models";
import * as Path from 'path';
import { QuestionDataTable } from "./QuestionDataTable";
import { EvidenceStatement } from './EvidenceStatement';

interface Props {
    view: ItemView;
    data?: AboutItemViewModel;
    questionNumber?: number;
}

export class ItemComponent extends React.Component<Props, undefined> {

    renderHeader() {
        if (this.props.questionNumber) {
            return (
                <h2>Question #{this.props.questionNumber}</h2>
            );
        } else {
            const items = this.props.data.associatedItems.split(',');
            return (
                <h2>Passage for {items.length === 1 ? 'item' : 'items'} {items.join(', ')}</h2>
            )
        }
    }

    render() {
        let item, evidence: JSX.Element;
        if (this.props.view.type === ViewType.html) {
            item = (<div dangerouslySetInnerHTML={{__html: this.props.view.html}} />);
        } else {
            const fileName = Path.basename(this.props.view.picturePath);
            item = (<img src={'images/screenshots/' + fileName} />);
        }

        if (this.props.data && this.props.data.evidenceStatement) {
            evidence = (<EvidenceStatement statement={this.props.data.evidenceStatement} />)
        }
        return (
            <div className='item'>
                {this.renderHeader()}
                {this.props.data 
                    ? (<QuestionDataTable tableData={this.props.data.itemCardViewModel}/>) 
                    : null}
                {evidence}
                {item}
            </div>
        );
    }
}