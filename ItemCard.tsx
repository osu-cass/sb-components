import * as React from 'react';
import * as GradeLevels from './GradeLevels';
import * as API from './ApiModels';
import * as AboutItem from './AboutItem';
import * as ItemCardViewModel from './ItemCardViewModel'
import * as ItemCardFields from './ItemCardFields'
import * as ItemCardCondensed from './ItemCardCondensed'

export interface Props{
    aboutItem: ItemCardViewModel.ItemCardViewModel;
}

export class ItemCard extends React.Component<Props, {}> {
    handleKeyPress(bankKey: number, itemKey: number, e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 13 || e.keyCode === 23) {
            ItemCardFields.itemPageLink(bankKey, itemKey);
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false;
    }
    
    renderHeader() {
        return (
            <h4 className="card-title">{this.props.aboutItem.subjectLabel}</h4>
        );
    }

    renderCard(bankKey: number, itemKey: number) {
        const item = {bankKey, itemKey};
        return (
            <div className={`card card-block ${this.props.aboutItem.subjectCode.toLowerCase()}`}
                onClick={e => ItemCardFields.itemPageLink(bankKey, itemKey)}
                onKeyUp={e => this.handleKeyPress(bankKey, itemKey, e)}
                tabIndex={0}>
                <div className="card-contents">
                    {this.renderHeader()};
                    <ItemCardFields.ItemCardFields aboutItem={this.props.aboutItem}/>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderCard(this.props.aboutItem.bankKey, this.props.aboutItem.itemKey)};
            </div>
        );
    }
}