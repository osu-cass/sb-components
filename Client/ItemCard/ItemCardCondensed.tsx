import * as React from 'react';
import * as ItemCardModels from './ItemCardModels';

export class ItemCardCondensed extends React.Component<ItemCardModels.ItemCardViewModel, {}> {

    handleKeyPress(bankKey: number, itemKey: number, e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 13) {
            ItemCardModels.itemPageLink(bankKey, itemKey);
        }
    }

    render() {
        const { bankKey, itemKey } = this.props;
        return (
            <div className={`card card-block ${this.props.subjectCode.toLowerCase()} condensed`}
                onClick={e => ItemCardModels.itemPageLink(bankKey, itemKey)}
                onKeyUp={e => this.handleKeyPress(bankKey, itemKey, e)}
                tabIndex={0}>
                <div className="card-contents">
                    <h4 className="card-title">{this.props.subjectLabel}</h4>
                    <p className="card-text claim">
                        <span className="card-text-label">Claim:</span>
                        <span className="card-text-value"> {this.props.claimLabel}</span>
                    </p>
                    <p className="card-text target">
                        <span className="card-text-label">Target:</span>
                        <span className="card-text-value"> {this.props.targetShortName}</span>
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
}