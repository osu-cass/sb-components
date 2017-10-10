import * as React from 'react';
import { ItemGroup } from '../Models';
import { ItemPage } from './ItemPage';
import { FirstPage } from "./FirstPage";

interface Props {
    items: ItemGroup[];
    grade: string;
    subject: string;
    pageBaseUrl: string;
    ivsBaseUrl: string;
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
                    <base href={this.props.pageBaseUrl} />
                    <link rel='stylesheet' href='css/pdf.css' />
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

