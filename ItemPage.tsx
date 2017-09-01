import * as React from 'react'
import { QuestionTableData } from "../Models";
import { QuestionDataTable } from './QuestionDataTable';

interface Props {
    tableData: QuestionTableData;
    title: string
}

export class ItemPage extends React.Component<Props, {}> {
    render() {
        return (
            <div className='item-page'>
                <QuestionDataTable tableData={this.props.tableData} />
            </div>
        );
    }
}