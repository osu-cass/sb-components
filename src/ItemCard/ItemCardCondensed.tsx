import "src/Assets/Styles/item-card.less";
import * as React from "react";
import * as ItemCardModels from "./ItemCardModels";
import { Redirect } from "react-router";

export interface ItemCardCondensedState {
  redirect: boolean;
}
export interface ItemCardCondensedProps extends ItemCardModels.ItemCardModel {}

export class ItemCardCondensed extends React.Component<
  ItemCardCondensedProps,
  ItemCardCondensedState
> {
  constructor(props: ItemCardCondensedProps) {
    super(props);
    this.state = { redirect: false };
  }

  shouldComponentUpdate(
    nextProps: Readonly<ItemCardCondensedProps>,
    nextState: Readonly<ItemCardCondensedState>,
    nextContext: any
  ): boolean {
    return this.state.redirect;
  }

  handleKeyPress(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 13 || e.keyCode === 23) {
      this.setState({ redirect: true });
    }
  }
  handleOnClick() {
    this.setState({ redirect: true });
  }

  render() {
    const { bankKey, itemKey } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={`/Item/${bankKey}-${itemKey}`} />;
    }
    return (
      <div
        className={`card card-block ${this.props.subjectCode.toLowerCase()} condensed`}
        onClick={() => this.handleOnClick()}
        onKeyUp={e => this.handleKeyPress(e)}
        tabIndex={0}
      >
        <div className="card-contents">
          <h4 className="card-title">{this.props.subjectLabel}</h4>
          <p className="card-text claim">
            <span className="card-text-label">Claim:</span>
            <span className="card-text-value"> {this.props.claimLabel}</span>
          </p>
          <p className="card-text target">
            <span className="card-text-label">Target:</span>
            <span className="card-text-value">
              {" "}
              {this.props.targetShortName}
            </span>
          </p>
          <p className="card-text interaction-type">
            <span className="card-text-label">Item Type:</span>
            <span className="card-text-value">
              {" "}
              {this.props.interactionTypeLabel}
            </span>
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
