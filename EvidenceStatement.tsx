import * as React from 'react';

interface Props {
    statement: string;
}

export class EvidenceStatement extends React.Component<Props, {}> {
    render() {
        return (
            <div className="centered-table-container">
                <table className='item-data-table'>
                    <thead>
                        <tr>
                            <th>Evidence Statement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.statement}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}