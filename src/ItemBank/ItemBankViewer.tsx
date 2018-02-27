import * as React from "react";
import {
  AboutItemRevisionModel,
  AccResourceGroupModel,
  AdvancedAboutItem,
  ItemAccessibilityModal,
  ItemViewerFrame,
  ResourceSelectionsModel
} from "../index";
import { RevisionContainer } from "../Revisions/RevisionContainer";
import { RevisionModel } from "../Revisions/Revision";

export interface ItemBankViewerProps {
  onAccessibilityUpdate: (accResourceGroups: AccResourceGroupModel[]) => void;
  onAccessibilityReset: () => void;
  onItemSelect: (direction: "next" | "previous") => void;
  onRevisionSelect: (revision: string) => void;
  itemUrl?: string;
  aboutItemRevisionModel: AboutItemRevisionModel;
  accResourceGroups: AccResourceGroupModel[];
  revisions: RevisionModel[];
}

export class ItemBankViewer extends React.Component<ItemBankViewerProps, {}> {
  constructor(props: ItemBankViewerProps) {
    super(props);
  }

  handleAccessibilityChange = (accResource: ResourceSelectionsModel) => {
    console.error("Not Implemented");
  };

  renderRightNav(): JSX.Element {
    const {
      onAccessibilityUpdate,
      onAccessibilityReset,
      accResourceGroups
    } = this.props;

    return (
      <div
        className="item-nav-right-group"
        role="group"
        aria-label="Second group"
      >
        <ItemAccessibilityModal
          accResourceGroups={accResourceGroups}
          onSave={this.handleAccessibilityChange}
          onReset={onAccessibilityReset}
        />
      </div>
    );
  }

  renderMidNav() {
    const { onItemSelect } = this.props;

    //TODO: add previous and next items

    return (
      <div className="nav-buttons">
        <button
          onClick={() => onItemSelect("previous")}
          className="btn btn-link previous"
        >
          Previous
        </button>
        <button
          onClick={() => onItemSelect("next")}
          className="btn btn-link next"
        >
          Next
        </button>
      </div>
    );
  }

  renderNavBar() {
    const { aboutItemRevisionModel } = this.props;

    return (
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
          <AdvancedAboutItem {...aboutItemRevisionModel} />
        </div>
        {this.renderMidNav()}
        {this.renderRightNav()}
      </div>
    );
  }

  render() {
    const { itemUrl, revisions, onRevisionSelect } = this.props;

    return (
      <div className="revisions-items">
        <RevisionContainer
          revisions={revisions}
          onRevisionSelect={onRevisionSelect}
        />
        <div
          className="about-item-iframe"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          {this.renderNavBar()}
          <ItemViewerFrame url={itemUrl || ""} />
        </div>
      </div>
    );
  }
}
