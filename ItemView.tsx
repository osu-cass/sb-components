import * as React from 'react';
import { ItemView, ViewType, AboutItemViewModel } from "../Models";
import * as Path from 'path';
import { QuestionDataTable } from "./QuestionDataTable";
import { EvidenceStatement } from './EvidenceStatement';

interface Props {
    view: ItemView;
}

export class ItemViewComponent extends React.Component<Props, undefined> {
    render() {
        let item, evidence: JSX.Element;
        if (this.props.view.type === ViewType.html) {
            item = (<div dangerouslySetInnerHTML={{__html: this.props.view.html}} />);
        } else {
            const fileName = Path.basename(this.props.view.picturePath);
            item = (<img src={'images/screenshots/' + fileName} />);
        }

        return item;
    }
}