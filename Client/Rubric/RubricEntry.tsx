import * as React from 'react';
import * as AboutItemModels from '../AboutItem/AboutItemModels';
import * as Collapsible from './Collapsible';

export class RubricEntryComponent extends React.Component<AboutItemModels.RubricEntry, {}> {
    render() {
        const pointLabel = this.props.scorepoint === "1" ? "point" : "points";
        const label = `${this.props.name} (${this.props.scorepoint} ${pointLabel})`;
        return (
            <Collapsible.CComponent label={label}>
                <div dangerouslySetInnerHTML={{ __html: this.props.value }} />
            </Collapsible.CComponent>
        );
    }
}