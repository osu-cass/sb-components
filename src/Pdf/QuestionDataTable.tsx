import * as React from 'react';
import { ItemCardModel } from "../ItemCard/ItemCardModels";

export interface QuestionDataTableProps {
    card: ItemCardModel;
}

export class QuestionDataTable extends React.Component<QuestionDataTableProps, {}> {
    render() {
        return (
            <table className='item-data-table'>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Claim</th>
                        <th>Domain</th>
                        <th>Target</th>
                        <th>DOK</th>
                        <th>Standards</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.card.bankKey}-{this.props.card.itemKey}</td>
                        <td>{this.props.card.claimCode}</td>
                        <td>{this.props.card.domain}</td>
                        <td>{this.props.card.targetId}</td>
                        <td>{this.props.card.depthOfKnowledge}</td>
                        <td>{this.props.card.commonCoreStandardId}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
