import {
  AboutItem,
  AboutItemModel,
  getResourceContent,
  ItemAccessibilityModal,
  ItemViewerFrame
} from "../index";
import * as React from "react";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { AccResourceGroupModel } from "../index";

export interface ItemBankState {
  itemUrl?: string;
  aboutThisItemViewModel: AboutItemModel;
  accResourceGroups: AccResourceGroupModel[];
  revisions: string[];
}

export class ItemBank extends React.Component<{}, ItemBankState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      aboutThisItemViewModel: AboutItemMockModel,
      itemUrl: "http://ivs.smarterbalanced.org/items?ids=187-3377",
      accResourceGroups: [],
      revisions: ["sample", "revisions", "for", "styling"]
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

  renderRevisions = (rev: string) => {
    const revision = rev;
    return (
      <div className="revisions-links">
        <ul>
          <li>{revision}</li>
        </ul>
      </div>
    );
  };

  renderRevisionsContainer() {
    const revisions = this.state.revisions.map(this.renderRevisions);
    return (
      <div className="revisions section-light">
        <h3>Revisions</h3>
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
