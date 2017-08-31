import * as React from 'react';
import * as GradeLevels from './GradeLevels';
import * as API from './ApiModels';
import * as AboutItem from './AboutItem';
import * as ItemCardViewModel from './ItemCardViewModel'

export class ItemCardCondensed extends React.Component<ItemCardViewModel.ItemCardViewModel, {}> {
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
            <h4 className="card-title">{this.props.subjectLabel}</h4>
        );
    }

    renderCard(bankKey: number, itemKey: number) {
        return (
            <div className={`card card-block ${this.props.subjectCode.toLowerCase()} condensed`}
                onClick={e => this.itemPageLink(bankKey, itemKey)}
                onKeyUp={e => this.handleKeyPress(bankKey, itemKey, e)}
                tabIndex={0}>
                <div className="card-contents">
                    {this.renderHeader()};
                    <p className="card-text claim">
                        <span className="card-text-label">Claim:</span>
                        <span className="card-text-value"> {this.props.claimLabel}</span>
                    </p>
                    <p className="card-text target">
                        <span className="card-text-label">Target:</span>
                        <span className="card-text-value"> {this.props.target}</span>
                    </p>
                    <p className="card-text interaction-type">
                        <span className="card-text-label">Item Type:</span>
                        <span className="card-text-value"> {this.props.interactionTypeLabel}</span>
                    </p>
                    <p className="card-text item-id">
                        <span className="card-text-label">Item Id:</span>
                        <span className="card-text-value"> {this.props.itemKey}</span>
                    </p>
                </div>
            </div>
        );
    }

    render() {
        const { bankKey, itemKey } = this.props;
        return (
            <div>
                {this.renderCard(bankKey, itemKey)};
            </div>
        );
    }
}