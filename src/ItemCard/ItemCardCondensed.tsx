import * as React from "react";
import * as ItemCardModels from "./ItemCardModels";
import { Redirect } from "react-router";

export interface ItemCardCondensedState {
  redirect: boolean;
}

export class ItemCardCondensed extends React.Component<
  ItemCardModels.ItemCardModel,
  ItemCardCondensedState
> {
  constructor(props: ItemCardModels.ItemCardModel) {
    super(props);
    this.state = { redirect: false };
  }

  // (nextContext: any) is defined as such in the React types
  shouldComponentUpdate(
    nextProps: Readonly<ItemCardModels.ItemCardModel>,
    nextState: Readonly<ItemCardCondensedState>
  ): boolean {
    return this.state.redirect;
  }

  handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13 || e.keyCode === 23) {
      this.setState({ redirect: true });
    }
  };
  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { bankKey, itemKey } = this.props;
    let content = <Redirect push to={`/Item/${bankKey}-${itemKey}`} />;
    if (!this.state.redirect) {
      content = (
        <div
          className={`card card-block ${this.props.subjectCode.toLowerCase()} condensed`}
          onClick={this.handleOnClick}
          onKeyUp={this.handleKeyPress}
          tabIndex={0}
          role="link"
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

    return content;
  }
}
