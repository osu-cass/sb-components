import "../Styles/item-card.less";
import * as React from "react";
import * as GradeLevels from "../GradeLevels/GradeLevels";
import * as ItemCardModels from "./ItemCardModels";
import { Redirect } from "react-router";

export interface ItemCardState {
  redirect: boolean;
}
export interface ItemCardProps extends ItemCardModels.ItemCardModel {}

export class ItemCard extends React.Component<ItemCardProps, ItemCardState> {
  constructor(props: ItemCardProps) {
    super(props);
    this.state = { redirect: false };
  }

  handleKeyPress(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 13 || e.keyCode === 23) {
      this.setState({ redirect: true });
    }
  }

  handleOnClick() {
    this.setState({ redirect: true });
  }

  shouldComponentUpdate(
    nextProps: Readonly<ItemCardProps>,
    nextState: Readonly<ItemCardState>,
    nextContext: any
  ): boolean {
    return this.state.redirect;
  }

  render() {
    const { bankKey, itemKey } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={`/Item/${bankKey}-${itemKey}`} />;
    }

    return (
      <div
        className={`card card-block ${this.props.subjectCode.toLowerCase()}`}
        onClick={() => this.handleOnClick()}
        onKeyUp={e => this.handleKeyPress(e)}
        tabIndex={0}
      >
        <div className="card-contents">
          <h4
            className="card-title"
            onClick={() => this.handleOnClick()}
            onKeyUp={e => this.handleKeyPress(e)}
          >
            {this.props.title}
          </h4>
          <p className="card-text subject">
            <span className="card-text-label">Subject:</span>
            <span className="card-text-value"> {this.props.subjectLabel}</span>
          </p>
          <p className="card-text grade">
            <span className="card-text-label">Grade:</span>
            <span className="card-text-value"> {this.props.gradeLabel}</span>
          </p>
          <p className="card-text claim">
            <span className="card-text-label">Claim:</span>
            <span className="card-text-value"> {this.props.claimLabel}</span>
          </p>
          <p className="card-text target">
            <span className="card-text-label">Target:</span>
            <span className="card-text-value">
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
