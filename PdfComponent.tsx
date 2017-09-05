import * as React from 'react';
import { ItemGroup } from '../Models';
import { ItemPage } from './ItemPage';

interface Props {
    items: ItemGroup[];
}

export class PdfComponent extends React.Component<undefined, undefined> {
    render() {
        let itemData = {
            item: 'item',
            claim: 'claim',
            domain: 'domain',
            target: 'target',
            depthOfKnowledge: 'depth',
            ccssMc: 'ccss mc',
            ccssMp: 'ccss mp'
        };
        let title = 'Grade 5 Math';
        const port = process.env.PORT || 3000;
        return (
            <html>
                <head>
                    <base href={'http://localhost:' + port} />
                    <link rel='stylesheet' href='css/pdf.css' />
                </head>
                <body>
                    <ItemPage tableData={itemData} title={title} />
                    <ItemPage tableData={itemData} title={title} />
                </body>
            </html>
        );
    }
}

