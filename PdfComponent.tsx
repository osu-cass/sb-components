import * as React from 'react';
import { ItemGroup } from '../Models';
import { ItemPage } from './ItemPage';

interface Props {
    items: ItemGroup[];
}

export class PdfComponent extends React.Component<Props, undefined> {
    render() {
        const port = process.env.PORT || 3000;
        
        const itemPages = this.props.items.map(item => (
            <ItemPage itemData={item} />
        ));

        return (
            <html>
                <head>
                    <base href={'http://localhost:' + port} />
                    <link rel='stylesheet' href='css/pdf.css' />
                </head>
                <body>
                    {itemPages}
                </body>
            </html>
        );
    }
}

