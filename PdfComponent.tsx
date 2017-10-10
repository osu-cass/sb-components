import * as React from 'react';
import { ItemGroup } from '../Models';
import { ItemPage } from './ItemPage';
import { FirstPage } from "./FirstPage";

interface Props {
    items: ItemGroup[];
    grade: string;
    subject: string;
    baseUrl: string;
}

export class PdfComponent extends React.Component<Props, {}> {
    render() {
        const itemPages = this.props.items.map(item => (
            <ItemPage itemData={item} key={item.questions[0].id}/>
        ));

        return (
            <html>
                <head>
                    <base href={this.props.baseUrl} />
                    <link rel='stylesheet' href='css/pdf.css' />
                </head>
                <body>
                    <FirstPage grade={this.props.grade} subject={this.props.subject} />
                    {itemPages}
                </body>
            </html>
        );
    }
}

