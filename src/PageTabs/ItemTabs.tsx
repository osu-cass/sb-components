import * as React from "react";

export type Tabs = "viewer" | "rubric" | "information";

export interface ItemTabsProps {
  changedTab: (tab: Tabs) => void;
  selectedTab: Tabs;
  showRubricTab?: boolean;
}

export class ItemTabs extends React.Component<ItemTabsProps, {}> {
  private select: Tabs;

  constructor(props: ItemTabsProps) {
    super(props);

    this.state = {
      selectedTab: this.props.selectedTab
    };
  }

  onClick = (selectedVal: Tabs) => {
    this.props.changedTab(selectedVal);
  };

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
