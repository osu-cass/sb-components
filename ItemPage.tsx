import * as React from 'react'
import { QuestionTableData } from "../Models";
import * as ItemTable from './QuestionDataTable';

interface Props {
    tableData: QuestionTableData;
    title: string
}

export class Component extends React.Component<Props, undefined> {
    render() {
        return (
            <div className='item-page'>
                <ItemTable.Component tableData={this.props.tableData} />
            </div>
        );
    }
}