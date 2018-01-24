import {
  AboutItem,
  AboutItemModel,
  getResourceContent,
  ItemAccessibilityModal,
  ItemViewerFrame
} from "../index";
import * as React from "react";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
// import { RevisionMockModel } from "mocks/ItemBank/mocks";
import { AccResourceGroupModel } from "../index";

export interface RevisionModel {
  author: string;
  date: Date;
  commitMessage: string;
  commitHash: string;
}

export interface ItemBankProps {
  revisions: RevisionModel[];
}

export interface ItemBankState {
  itemUrl?: string;
  aboutThisItemViewModel: AboutItemModel;
  accResourceGroups: AccResourceGroupModel[];
}

export class ItemBank extends React.Component<ItemBankProps, ItemBankState> {
  constructor(props: ItemBankProps) {
    super(props);
    this.state = {
      aboutThisItemViewModel: AboutItemMockModel,
      itemUrl: "http://ivs.smarterbalanced.org/items?ids=187-3377",
      accResourceGroups: []
    };
  }

  renderItemFrame(): JSX.Element {
    const aboutThisItem = this.state.aboutThisItemViewModel;
    let content: JSX.Element;

    if (aboutThisItem) {
      content = (
        <div
          className="about-item-iframe"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          <div
            className="item-nav"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div
              className="item-nav-left-group"
              role="group"
              aria-label="First group"
            >
              <AboutItem showRubrics={false} {...aboutThisItem} />
            </div>
            {this.renderRightNav()}
          </div>
          <ItemViewerFrame url={this.state.itemUrl || ""} />
        </div>
      );
    } else {
      content = <div />;
    }

    return content;
  }

  renderRightNav(): JSX.Element {
    return (
      <div
        className="item-nav-right-group"
        role="group"
        aria-label="Second group"
      >
        <ItemAccessibilityModal
          accResourceGroups={this.state.accResourceGroups}
          onSave={() => {}}
          onReset={() => {}}
        />
      </div>
    );
  }

  renderRevisions = (rev: RevisionModel) => {
    return (
      <div className="revisions-overview" key={rev.commitHash}>
        <ul className="revisions-list">
          <li>
            <div className="revisions-links">
              <a>{rev.commitHash}</a>
              <div className="revisions-message">{rev.commitMessage}</div>
            </div>
            <div className="revisions-details">
              {rev.author}-
              {rev.date.getMonth() + 1}/{rev.date.getDate()}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  renderRevisionsContainer() {
    const revisions = this.props.revisions.map(this.renderRevisions);
    return (
      <div className="revisions section-light">
        <h3 className="revisions-header">Revisions</h3>
        {revisions}
      </div>
    );
  }

  renderItemBankPage() {
    return (
      <div className="revisions-container container">
        {this.renderRevisionsContainer()}
        {this.renderItemFrame()}
      </div>
    );
  }

  render() {
    return (
      <div className="revisions-container container">
        {this.renderItemBankPage()}
      </div>
    );
  }
}
