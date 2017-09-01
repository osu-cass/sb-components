import * as React from 'react';
import * as GradeLevels from './GradeLevels';
import * as API from './ApiModels';
import * as AboutItem from './AboutItem';
import * as ItemCardViewModel from './ItemCardViewModel';
import * as ItemCardFields from './ItemCardFields';

export interface Props{
    aboutItem: ItemCardViewModel.ItemCardViewModel;
}

export class ItemCardCondensed extends React.Component<Props, {}> {
    itemPageLink(bankKey: number, itemKey: number) {
        window.location.href = "/Item/Details?bankKey=" + bankKey + "&itemKey=" + itemKey;
    }
    handleKeyPress(bankKey: number, itemKey: number, e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 13) {
            this.itemPageLink(bankKey, itemKey);
        }
    }

    renderHeader() {
        return (
            <h4 className="card-title">{this.props.aboutItem.subjectLabel}</h4>
        );
    }

    renderCard(bankKey: number, itemKey: number) {
        const aboutItem = this.props.aboutItem;
        return (
            <div className={`card card-block ${aboutItem.subjectCode.toLowerCase()} condensed`}
                onClick={e => this.itemPageLink(bankKey, itemKey)}
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
        const aboutItem = this.props.aboutItem;
        return (
            <div>
                {this.renderCard(aboutItem.bankKey, aboutItem.itemKey)};
            </div>
        );
    }
}