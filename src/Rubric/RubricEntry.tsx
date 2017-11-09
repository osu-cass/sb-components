import * as React from 'react';
import {RubricEntryModel} from './RubricModels';
import { Collapsible } from './Collapsible';

export class RubricEntry extends React.Component<RubricEntryModel, {}> {
    render() {
        const pointLabel = this.props.scorepoint === "1" ? "point" : "points";
        const label = `${this.props.name} (${this.props.scorepoint} ${pointLabel})`;
        return (
            <Collapsible label={label}>
                <div dangerouslySetInnerHTML={{ __html: this.props.value }} />
            </Collapsible>
        );
    }
}