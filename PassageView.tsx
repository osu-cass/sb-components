import * as React from 'react';
import { ItemView } from '../Models';
import { ItemViewComponent } from './ItemView';

interface Props {
    view: ItemView;
    associatedItems: string[];
}

export class PassageView extends React.Component<Props, {}> {
    render() {
        return (
            <div className='item'>
                <h2>Passage for {this.props.associatedItems.length === 1 ? 'item' : 'items'} {this.props.associatedItems.join(', ')}</h2>
                <ItemViewComponent view={this.props.view} />
            </div>
        );
    }
}