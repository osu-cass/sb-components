import * as React from 'react';
import { ItemView, ViewType } from "../Models";
import * as Path from 'path';

interface Props {
    view: ItemView;
}

export class ItemComponent extends React.Component<Props, undefined> {

    render() {
        let item: JSX.Element;
        if (this.props.view.type === ViewType.html) {
            item = (<div dangerouslySetInnerHTML={{__html: this.props.view.html}} />);
        } else {
            const source = this.props.view.picturePath.split(Path.sep);
            source.splice(0, 2);
            item = (<img src={source.join('/')} />);
        }

        return (
            <div className='item'>
                {item}
            </div>
        );
    }
}