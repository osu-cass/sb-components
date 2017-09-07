import * as React from 'react';
import { ItemViewModel } from "../Models";

interface Props {
    tableData: ItemViewModel;
}

export class QuestionDataTable extends React.Component<Props, {}> {
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
                        <td>{this.props.tableData.bankKey}-{this.props.tableData.itemKey}</td>
                        <td>{this.props.tableData.claimCode}</td>
                        <td>{this.props.tableData.domain}</td>
                        <td>{this.props.tableData.target}</td>
                        <td>{this.props.tableData.depthOfKnowledge}</td>
                        <td>{this.props.tableData.commonCoreStandardId}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
