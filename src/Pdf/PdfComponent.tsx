import * as path from 'path';
import * as React from 'react';
import { ItemGroup } from '../Models';
import { ItemPage } from './ItemPage';
import { FirstPage } from "./FirstPage";


interface Props {
    items: ItemGroup[];
    grade: string;
    subject: string;
    ivsBaseUrl: string;
    cssUrl: string;
    displayTitlePage: boolean;
}

export class PdfComponent extends React.Component<Props, {}> {
    render() {
        const itemPages = this.props.items.map(item => (
            <ItemPage itemData={item} key={item.questions[0].id}/>
        ));

        return (
            <html>
                <head>
                    <meta charSet="UTF-8" />
                    <link rel='stylesheet' href={this.props.cssUrl} />
                    <link rel='stylesheet' href={this.props.ivsBaseUrl + "/Shared/CSS/Universal/items.css"} />
                    <link rel='stylesheet' href={this.props.ivsBaseUrl + "/Projects/SBAC/css/modernItems.css"} />
                </head>
                <body>
                    {this.props.displayTitlePage
                        ? <FirstPage grade={this.props.grade} subject={this.props.subject} />
                        : null}
                    {itemPages}
                </body>
            </html>
        );
    }
}
