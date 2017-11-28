import * as React from "react";
import { AboutItemModel } from "../AboutItem/AboutItemModels";
import { ItemViewerFrame, Rubric, AboutThisItemDetail } from "../index";
import { Tabs, ItemTabs } from "../PageTabs/ItemTabs";

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
    if (this.props.item) {
      const rubrics = this.props.item.rubrics.map((ru, i) => (
        <Rubric {...ru} key={String(i)} />
      ));
      return <div className="item-content">{rubrics}</div>;
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
    let selectedTab = null;
    if (this.props.item) {
      const selectedTab = this.state.selectedTab;
      const itemCard = this.props.item.itemCardViewModel;

      let resultElement: JSX.Element[] | JSX.Element | undefined;
      if (selectedTab == "viewer") {
        const url =
          "http://ivs.smarterbalanced.org/items?ids=" +
          itemCard.bankKey.toString() +
          "-" +
          itemCard.itemKey.toString();
        resultElement = <div> {this.renderViewer(url)} </div>;
      } else if (selectedTab == "rubric") {
        resultElement = <div> {this.renderRubric()} </div>;
      } else if (selectedTab == "information") {
        resultElement = <div> {this.renderInformation()}</div>;
      }
      return resultElement;
    }
  }
  render() {
    return (
      <div className="item-card">
        <ItemTabs
          changedTab={tab => this.onTabChange(tab)}
          selectedTab={this.state.selectedTab}
        />
        {this.renderChosen()}
      </div>
    );
  }
}
