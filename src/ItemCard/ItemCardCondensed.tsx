import * as React from "react";
import * as ItemCardModels from "./ItemCardModels";
import { Redirect } from "react-router";
import * as GradeLevels from "../GradeLevels/GradeLevels";
// tslint:disable:no-require-imports
const claimIcons: { [claimCode: string]: string } = {
  MATH1: require("@sbac/sbac-ui-kit/src/images/math-1.svg"),
  MATH2: require("@sbac/sbac-ui-kit/src/images/math-2.svg"),
  MATH3: require("@sbac/sbac-ui-kit/src/images/math-3.svg"),
  MATH4: require("@sbac/sbac-ui-kit/src/images/math-4.svg"),
  ELA1: require("@sbac/sbac-ui-kit/src/images/ela-1.svg"),
  ELA2: require("@sbac/sbac-ui-kit/src/images/ela-2.svg"),
  ELA3: require("@sbac/sbac-ui-kit/src/images/ela-3.svg"),
  ELA4: require("@sbac/sbac-ui-kit/src/images/ela-4.svg")
};
// tslint:enable:no-require-imports

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

  shouldComponentUpdate(
    nextProps: Readonly<ItemCardModels.ItemCardModel>,
    nextState: Readonly<ItemCardCondensedState>
  ): boolean {
    return nextState.redirect;
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
            <div className="card-header">
              <h4 className="card-title">{this.props.subjectLabel}</h4>
              <div className="card-icon-container">
                <span className="card-grade-tag card-icon">
                  {GradeLevels.GradeLevel.gradeCaseToShortString(
                    this.props.grade
                  )}
                </span>
                {/* <img
                  src={claimIcons[this.props.claimCode]}
                  alt={this.props.claimLabel}
                  className="card-icon"
                  width="32px"
                /> */}
              </div>
            </div>
            <p className="card-text claim">
              <span className="card-text-label">Claim:</span>
              <span className="card-text-value"> {this.props.claimLabel}</span>
            </p>
            <p className="card-text target">
              <span className="card-text-label">Target:</span>
              <span className="card-text-value"> {this.props.targetId}</span>
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
