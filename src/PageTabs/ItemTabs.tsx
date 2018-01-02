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
      <div
        className={
          this.props.selectedTab === tabType
            ? "selected-tab"
            : "tab-not-selected"
        }
        onClick={() => this.onClick(tabType)}
      >
        {label}
      </div>
    );
  }

  render() {
    let rubricTab;
    if (this.props.showRubricTab && this.props.showRubricTab === true) {
      rubricTab = this.renderTab("Rubric and Exemplar", "rubric");
    }

    return (
      <div className="tabs">
        {this.renderTab("Item Viewer", "viewer")}
        {rubricTab}
        {this.renderTab("Item Information", "information")}
      </div>
    );
  }
}
