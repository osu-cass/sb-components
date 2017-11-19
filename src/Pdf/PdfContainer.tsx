import * as React from 'react';
import { ItemGroupModel } from "./PdfModels";
import { ItemViewContainer } from './ItemViewContainer';
import { CoverPage } from "./CoverPage";


export interface PdfContainerProps {
    items: ItemGroupModel[];
    grade: string;
    subject: string;
    ivsBaseUrl: string;
    cssUrl: string;
    displayTitlePage: boolean;
}

export class PdfContainer extends React.Component<PdfContainerProps, {}> {
    render() {
        const itemPages = this.props.items.map(item => (
            <ItemViewContainer itemData={item} key={item.questions[0].id}/>
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
                        ? <CoverPage grade={this.props.grade} subject={this.props.subject} />
                        : null}
                    {itemPages}
                </body>
            </html>
        );
    }
}
