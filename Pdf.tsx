import * as React from 'react';
import { Item } from '../Models';
import * as ItemPage from './ItemPage';

interface Props {
    items: Item[];
}

export class Component extends React.Component<undefined, undefined> {
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
                    <ItemPage.Component tableData={itemData} title={title} />
                    <ItemPage.Component tableData={itemData} title={title} />
                </body>
            </html>
        );
    }
}

