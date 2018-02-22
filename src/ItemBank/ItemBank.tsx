import {
  AboutItem,
  AboutItemModel,
  getResourceContent,
  ItemAccessibilityModal,
  ItemViewerFrame
} from "../index";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AboutItemMockModel } from "mocks/AboutItem/mocks";
import { AccResourceGroupModel } from "../index";
import { ToolTip } from "../index";
import { Accordion } from "../Accordion/Accordion";

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

/**
 * Item Bank Entry Page for displaying items, revisions, and accessibility
 * @export
 * @class ItemBank
 * @extends {React.Component<ItemBankProps, ItemBankState>}
 */
export class ItemBank extends React.Component<ItemBankProps, ItemBankState> {
  constructor(props: ItemBankProps) {
    super(props);
    this.state = {
      aboutThisItemViewModel: AboutItemMockModel,
      accResourceGroups: [],
      itemUrl: "http://ivs.smarterbalanced.org/items?ids=187-3377"
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
            {this.renderMidNav()}
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

  renderMidNav() {
    return (
      <div className="nav-buttons">
        <a href="#" className="previous">
          &#8249; Previous
        </a>
        <a href="#" className="next">
          Next &#8250;
        </a>
      </div>
    );
  }

  renderRevisions = (rev: RevisionModel) => {
    return (
      <li key={rev.commitHash}>
        <ToolTip
          toolTipHeader={
            rev.date.toDateString() + "-" + rev.date.toLocaleTimeString()
          }
          helpText={
            "<b>Commit: </b>" +
            rev.commitMessage +
            "</br><b>Author: </b>" +
            rev.author +
            "</br><b>CommitHash: </b>" +
            rev.commitHash
          }
        >
          <a href="#">{rev.commitHash}</a>
          <div className="revisions-details">
            {rev.author}-
            {rev.date.getMonth() + 1}/{rev.date.getDate()}
          </div>
        </ToolTip>
      </li>
    );
  };

  renderRevisionsContainer() {
    const revisions = this.props.revisions.map(this.renderRevisions);
    return (
      <div className="revisions section-light">
        <h3 className="revisions-header">Revisions</h3>
        <ul>{revisions}</ul>
      </div>
    );
  }

  renderHelpButton() {
    return (
      <div className="help-button">
        <ToolTip
          helpText="Drag and drop items to add them to the table"
          position="bottom"
        >
          <button
            className="item-nav-btn btn btn-default btn-sm about-item-btn"
            role="button"
            aria-label="Open help text"
          >
            <span className="fa fa-info-circle" aria-hidden="true" />
            Help
          </button>
        </ToolTip>
      </div>
    );
  }

  renderAddItemsButton() {
    return (
      <div className="help-button">
        <ToolTip helpText="Add listed items to the table" position="bottom">
          <button aria-label="Open table of items">Add Items</button>
        </ToolTip>
      </div>
    );
  }

  renderAddItems() {
    const csvEntry = (): JSX.Element => {
      return (
        <div>
          {this.renderHelpButton()}
          <textarea className="csv-add" defaultValue="Drag Items Here" />
          {this.renderAddItemsButton()}
        </div>
      );
    };
    return <Accordion accordionTitle="CSV Entry" contentItem={csvEntry()} />;
  }

  renderItemsTable() {
    const itemsTable = (): JSX.Element => {
      return (
        <div className="current-items-table">
          <table className="items-list">
            <thead>
              <tr>
                <th>Items</th>
                <th>Bank</th>
                <th>Item</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>187-0000</td>
                <td>Bank # here</td>
                <td>info about the item goes here</td>
                <td>the section</td>
              </tr>
              <tr>
                <td>187-0000</td>
                <td>Bank # here</td>
                <td>info about the item goes here</td>
                <td>the section</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
    return (
      <Accordion accordionTitle="Items Table" contentItem={itemsTable()} />
    );
  }

  renderItemBankPage() {
    return (
      <div className="item-bank-page">
        {this.renderAddItems()}
        {this.renderItemsTable()}
        <div className="revisions-items">
          {this.renderRevisionsContainer()}
          {this.renderItemFrame()}
        </div>
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
