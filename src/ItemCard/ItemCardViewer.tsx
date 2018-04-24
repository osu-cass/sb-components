import * as React from "react";
import {
  ItemViewerFrame,
  RubricTable,
  AboutThisItemDetail,
  ItemTabs,
  Tabs,
  AboutItemModel
} from "@src/index";

export interface ItemCardViewerProps {
  item?: AboutItemModel;
}

export interface State {
  selectedTab: Tabs;
}

export class ItemCardViewer extends React.Component<
  ItemCardViewerProps,
  State
> {
  constructor(props: ItemCardViewerProps) {
    super(props);
    this.state = {
      selectedTab: "viewer"
    };
  }

  onTabChange(tab: Tabs) {
    this.setState({
      selectedTab: tab
    });
  }

  renderViewer(url: string) {
    return (
      <div className="item-content">
        <ItemViewerFrame url={url} />
      </div>
    );
  }

  renderRubric() {
    const aboutItem = this.props.item;

    if (aboutItem && aboutItem.sampleItemScoring) {
      if (aboutItem.sampleItemScoring.rubrics) {
        return (
          <div className="item-content">
            <RubricTable rubrics={aboutItem.sampleItemScoring.rubrics} />
          </div>
        );
      }
    }
  }

  renderInformation() {
    if (this.props.item) {
      const aboutItem = this.props.item;

      return (
        <div className="item-content">
          <div>
            <AboutThisItemDetail {...aboutItem} />
          </div>
        </div>
      );
    }
  }

  renderChosen() {
    if (this.props.item) {
      const selectedTab = this.state.selectedTab;
      const itemCard = this.props.item.itemCardViewModel;

      let resultElement: JSX.Element[] | JSX.Element | undefined;
      if (selectedTab === "viewer") {
        const url = `http://ivs.smarterbalanced.org/items?ids=${
          itemCard.bankKey
        }-${itemCard.itemKey}`;
        resultElement = <div> {this.renderViewer(url)} </div>;
      } else if (selectedTab === "rubric") {
        resultElement = <div> {this.renderRubric()} </div>;
      } else if (selectedTab === "information") {
        resultElement = <div> {this.renderInformation()}</div>;
      }

      return resultElement;
    }
  }
  render() {
    let rubricVisibility = false;
    if (
      this.props.item &&
      this.props.item.sampleItemScoring &&
      this.props.item.sampleItemScoring.rubrics
    ) {
      rubricVisibility = true;
    }

    return (
      <div className="item-card">
        <ItemTabs
          showRubricTab={rubricVisibility}
          changedTab={tab => this.onTabChange(tab)}
          selectedTab={this.state.selectedTab}
        />
        {this.renderChosen()}
      </div>
    );
  }
}
