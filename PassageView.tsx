import * as React from 'react';
import { ItemView } from '../Models';
import { ItemViewComponent } from './ItemView';

interface Props {
    view: ItemView;
    associatedItems: string;
}

export class PassageView extends React.Component<Props, {}> {
    render() {
        const items = this.props.associatedItems.split(',');
        return (
            <div className='item'>
                <h2>Passage for {items.length === 1 ? 'item' : 'items'} {items.join(', ')}</h2>
                <ItemViewComponent view={this.props.view} />
            </div>
        );
    }
}