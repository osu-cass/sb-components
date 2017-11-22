import * as React from "react";

export type Tabs = "viewer" | "rubric" | "information";

export interface ItemTabsProps {
  changedTab: (tab: Tabs) => void;
  selectedTab: Tabs;
}

export interface State {}

export class ItemTabs extends React.Component<ItemTabsProps, State> {
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

  render() {
    return (
      <div className="tabs">
        <div
          className={
            this.props.selectedTab == "viewer"
              ? "selected-tab"
              : "tab-not-selected"
          }
          onClick={() => this.onClick("viewer")}
        >
          Item Viewer
        </div>
        <div
          className={
            this.props.selectedTab == "rubric"
              ? "selected-tab"
              : "tab-not-selected"
          }
          onClick={() => this.onClick("rubric")}
        >
          Rubric and Exemplar
        </div>
        <div
          className={
            this.props.selectedTab == "information"
              ? "selected-tab"
              : "tab-not-selected"
          }
          onClick={() => this.onClick("information")}
        >
          Item Information
        </div>
      </div>
    );
  }
}
