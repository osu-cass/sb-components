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
                        <th>CCSS-MC</th>
                        <th>CCSS-MP</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.tableData.item}</td>
                        <td>{this.props.tableData.claim}</td>
                        <td>{this.props.tableData.domain}</td>
                        <td>{this.props.tableData.target}</td>
                        <td>{this.props.tableData.depthOfKnowledge}</td>
                        <td>{this.props.tableData.ccssMc}</td>
                        <td>{this.props.tableData.ccssMp}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
