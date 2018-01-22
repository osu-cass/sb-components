import * as React from "react";

/**
 * Names of the different tab types.
 * @type {Tabs}
 */
export type Tabs = "viewer" | "rubric" | "information";

/**
 * ItemTabsProps props
 * @export
 * @interface ItemTabsProps
 */
export interface ItemTabsProps {
  changedTab: (tab: Tabs) => void;
  selectedTab: Tabs;
  showRubricTab?: boolean;
}

/**
 * ItemTabs displays options for view state of a selected item.
 * @export
 * @class ItemTabs
 * @extends {React.Component<ItemTabsProps, {}>}
 */
export class ItemTabs extends React.Component<ItemTabsProps, {}> {
  private select: Tabs;

  constructor(props: ItemTabsProps) {
    super(props);

    this.state = {
      selectedTab: this.props.selectedTab
    };
  }

  /**
   * event handler for view state.
   */
  onClick = (selectedVal: Tabs) => {
    this.props.changedTab(selectedVal);
  };

  /**
   * renders individual tab components
   * @param {string} label
   * @param {Tabs} tabType
   * @returns
   */
  renderTab(label: string, tabType: Tabs) {
    return (
      <li
        role="button"
        className={
          this.props.selectedTab === tabType ? "nav-item active" : "nav-item"
        }
        onClick={() => this.onClick(tabType)}
      >
        <a className="nav-link">{label}</a>
      </li>
    );
  }

  render() {
    let rubricTab;
    if (this.props.showRubricTab && this.props.showRubricTab === true) {
      rubricTab = this.renderTab("Rubric and Exemplar", "rubric");
    }

    return (
      <ul className="nav nav-tabs">
        {this.renderTab("Item Viewer", "viewer")}
        {rubricTab}
        {this.renderTab("Item Information", "information")}
      </ul>
    );
  }
}
