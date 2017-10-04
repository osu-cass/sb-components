import * as React from 'react';
import { ItemGroup } from '../Models';
import { ItemPage } from './ItemPage';
import { FirstPage } from "./FirstPage";
import { getConfig } from "../Config";

interface Props {
    items: ItemGroup[];
    grade: string;
    subject: string;
}

export class PdfComponent extends React.Component<Props, {}> {
    render() {
        const port = getConfig().port;
        
        const itemPages = this.props.items.map(item => (
            <ItemPage itemData={item} key={item.questions[0].id}/>
        ));

        return (
            <html>
                <head>
                    <base href={'http://localhost:' + port} />
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

