import * as React from 'react';
import * as GradeLevels from './GradeLevels';
import * as API from './ApiModels';
import * as AboutItem from './AboutItem';
import * as ItemCardViewModel from './ItemCardViewModel'

export interface Props {
    aboutItem: ItemCardViewModel.ItemCardViewModel;
}

export function itemPageLink(bankKey: number, itemKey: number){
    window.location.href = "/Item/Details?bankKey=" + bankKey + "&itemKey=" + itemKey;
}

export class ItemCardFields extends React.Component<Props, {}> {
    handleKeyPress(bankKey: number, itemKey: number, e: React.KeyboardEvent<HTMLElement>) {
        if (e.keyCode === 13 || e.keyCode === 23) {
            itemPageLink(bankKey, itemKey);
        }
    }

    renderHeader(bankKey: number, itemKey: number) {
        if(!this.props.aboutItem.title){
            return(<div></div>);
        }

        return (
            <h4 className="card-title"
                onClick={e => itemPageLink(bankKey, itemKey)}
                onKeyUp={e => this.handleKeyPress(bankKey, itemKey, e)}>
                {this.props.aboutItem.title}
            </h4>
        );
    }

    renderSubject() {
        if(!this.props.aboutItem.subjectLabel){
            return(<div></div>);
        }

        return (
            <p className="card-text subject">
                <span className="card-text-label">Subject:</span>
                <span className="card-text-value"> {this.props.aboutItem.subjectLabel}</span>
            </p>
        );
    }

    renderCardTextGrade() {
        if(!this.props.aboutItem.gradeLabel){
            return(<div></div>);
        }

        return (
            <p className="card-text grade">
                <span className="card-text-label">Grade:</span>
                <span className="card-text-value"> {this.props.aboutItem.gradeLabel}</span>
            </p>
        );
    }

    renderCardTextClaim() {
        if(!this.props.aboutItem.claimLabel){
            return(<div></div>);
        }

        return (
            <p className="card-text claim">
                <span className="card-text-label">Claim:</span>
                <span className="card-text-value"> {this.props.aboutItem.claimLabel}</span>
            </p>
        );
    }

    renderCardTextTarget() {
        if(!this.props.aboutItem.target){
            return(<div></div>);
        }

        return (
            <p className="card-text target">
                <span className="card-text-label">Target:</span>
                <span className="card-text-value"> {this.props.aboutItem.target}</span>
            </p>
        );
    }

    renderCardTextInteractionType() {
        if(!this.props.aboutItem.interactionTypeLabel){
            return(<div></div>);
        }

        return (
            <p className="card-text interaction-type">
                <span className="card-text-label">Item Type:</span>
                <span className="card-text-value"> {this.props.aboutItem.interactionTypeLabel}</span>
            </p>
        );
    }

    renderCardTextItemId() {
        if(!this.props.aboutItem.itemKey){
            return(<div></div>);
        }

        return (
            <p className="card-text item-id">
                <span className="card-text-label">Item Id:</span>
                <span className="card-text-value"> {this.props.aboutItem.itemKey}</span>
            </p>
        );
    }

    render(){
        const bankKey = this.props.aboutItem.bankKey;
        const itemKey = this.props.aboutItem.itemKey;

        return(
            <div>
                {this.renderHeader(bankKey, itemKey)}
            </div>
        );
    }

}