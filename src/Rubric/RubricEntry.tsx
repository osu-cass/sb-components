import * as React from 'react';
import * as AboutItemModels from '../AboutItem/AboutItemModels';
import { Collapsible } from './Collapsible';

export class RubricEntry extends React.Component<AboutItemModels.RubricEntry, {}> {
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