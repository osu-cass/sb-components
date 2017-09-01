import * as React from 'react';

interface Props {
    title: string;
}

export class Component extends React.Component<Props, undefined> {
    render() {
        return (
            <div className='header'>
                <img src='images/SmarterBalanced_logo.png' className='header-logo' />
                <div className='header-title'>
                    {this.props.title}
                </div>
            </div>
        );
    }
}