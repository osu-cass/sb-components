import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  AboutItem,
  AboutItemModel,
  getResourceContent,
  ItemAccessibilityModal,
  ItemViewerFrame,
  ToolTip,
  AccResourceGroupModel,
  Accordion,
  AdvancedAboutItem,
  AboutItemRevisionModel,
  Resource,
  GradeLevels,
  Subscription,
  ItemRevisionModel,
  itemRevisionKey,
  SectionModel,
  AccessibilityRevisionModel,
  validItemRevisionModel,
  RevisionModel,
  ItemBankViewer,
  ItemBankEntry,
  getNextItemBank,
  getPreviousItemBank
} from "../index";

export interface ItemBankContainerProps {
  accessibilityClient: (
    acc: AccessibilityRevisionModel
  ) => Promise<AccResourceGroupModel[]>;
  aboutItemRevisionClient: (
    item: ItemRevisionModel
  ) => Promise<AboutItemRevisionModel>;
  revisionsClient: (item: ItemRevisionModel) => Promise<RevisionModel[]>;
  sectionsClient: () => Promise<SectionModel[]>;
  itemViewUrl: string;
  items?: ItemRevisionModel[];
}

export interface ItemBankContainerState {
  itemUrl?: string;
  aboutItemRevisionModel: Resource<AboutItemRevisionModel>;
  accResourceGroups: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemRevisionModel;
  items: ItemRevisionModel[];
  sections: Resource<SectionModel[]>;
  revisions: Resource<RevisionModel[]>;
  nextItem?: ItemRevisionModel;
  previousItem?: ItemRevisionModel;
}

/**
 * Item Bank Entry Page for displaying items, revisions, and accessibility
 * @export
 * @class ItemBankContainer
 * @extends {React.Component<ItemBankContainerProps, ItemBankContainerState>}
 */
export class ItemBankContainer extends React.Component<
  ItemBankContainerProps,
  ItemBankContainerState
> {
  private subscription = new Subscription();

  constructor(props: ItemBankContainerProps) {
    super(props);
    const items = props.items || [{}];
    const currentItem = validItemRevisionModel(items[0]) ? items[0] : undefined;

    this.state = {
      currentItem,
      items,
      aboutItemRevisionModel: { kind: "loading" },
      accResourceGroups: { kind: "loading" },
      itemUrl: "http://ivs.smarterbalanced.org/items?ids=187-3377",
      sections: { kind: "loading" },
      revisions: { kind: "loading" }
    };
  }

  componentDidMount() {
    this.fetchSections();
    this.handleChangeViewItem();
    this.handleChangeRevision();
  }

  componentWillUnmount() {
    this.subscription.cancelAll();
  }

  fetchAboutItemRevisionModel(item: ItemRevisionModel) {
    const prom = this.props.aboutItemRevisionClient(item);
    const promiseWrapper = this.subscription.add(
      "aboutItemRevisionClient",
      prom
    );

    promiseWrapper.promise.then(data => this.onFetchAboutItemSuccess(data));
  }

  onFetchAboutItemSuccess(data: AboutItemRevisionModel) {
    this.setState({
      aboutItemRevisionModel: { kind: "success", content: data }
    });
  }

  fetchAccResourceGroups(acc: AccessibilityRevisionModel) {
    const prom = this.props.accessibilityClient(acc);
    const promiseWrapper = this.subscription.add("accessibilityClient", prom);

    promiseWrapper.promise.then(data => this.onFetchAccResourceSuccess(data));
  }

  onFetchAccResourceSuccess(data: AccResourceGroupModel[]) {
    this.setState({ accResourceGroups: { kind: "success", content: data } });
  }

  fetchRevisions(item: ItemRevisionModel) {
    const prom = this.props.revisionsClient(item);
    const promiseWrapper = this.subscription.add("revisionsClient", prom);

    console.log("updated revisions", item);
    promiseWrapper.promise.then(data => this.onFetchRevisionsSuccess(data));
  }

  onFetchRevisionsSuccess(data: RevisionModel[]) {
    this.setState({ revisions: { kind: "success", content: data } });
  }

  fetchSections() {
    const prom = this.props.sectionsClient();
    const promiseWrapper = this.subscription.add("sectionsClient", prom);

    promiseWrapper.promise.then(data => this.onFetchSectionsSuccess(data));
  }

  onFetchSectionsSuccess(data: SectionModel[]) {
    this.setState({ sections: { kind: "success", content: data } });
  }

  handleUpdateItems = (items: ItemRevisionModel[]) => {
    const currentItem = items.length > 0 ? items[0] : undefined;
    const lastItem = items[items.length - 1];
    if (validItemRevisionModel(lastItem)) {
      items.push({});
    }
    this.setState({ items, currentItem }, () => {
      this.handleChangeViewItem();
      this.handleChangeRevision();
    });
  };

  /**
   * Updates prev and next items. Updates rubric, about item, and item url
   * @memberof ItemBankContainer
   */
  handleChangeViewItem = () => {
    const { currentItem, items } = this.state;
    if (currentItem) {
      this.fetchAboutItemRevisionModel(currentItem);
      this.fetchAccResourceGroups({
        interactionType: "",
        subject: "",
        gradeLevel: GradeLevels.All
      });
      const nextItem = getNextItemBank(currentItem, items);
      const previousItem = getPreviousItemBank(currentItem, items);

      this.setState({ nextItem, previousItem });
    }
  };

  async handleChangeRevision(): Promise<void> {
    const { currentItem } = this.state;
    if (currentItem) {
      return this.fetchRevisions(currentItem);
    }
  }

  onAccessibilityUpdate = (accResourceGroups: AccResourceGroupModel[]) => {
    this.setState({
      accResourceGroups: { kind: "success", content: accResourceGroups }
    });

    //TODO: update itemUrl
  };

  onAccessibilityReset = () => {
    //TODO: set acc state to resource
  };

  handleNextItem() {
    const { items, currentItem } = this.state;
    let nextItem = currentItem;
    if (currentItem) {
      const findNext = getNextItemBank(currentItem, items);
      nextItem = findNext || nextItem;
    } else {
      nextItem = items[0];
    }

    this.setState({ currentItem: nextItem }, () => {
      this.handleChangeViewItem();
      this.handleChangeRevision();
    });
  }

  handlePreviousItem() {
    const { items, currentItem } = this.state;
    let previousItem = currentItem;
    if (currentItem) {
      const findPrevious = getPreviousItemBank(currentItem, items);
      previousItem = findPrevious || previousItem;
    } else {
      previousItem = items[0];
    }

    this.setState({ currentItem: previousItem }, () => {
      this.handleChangeViewItem();
      this.handleChangeRevision();
    });
  }

  onItemSelect = (direction: "next" | "previous") => {
    switch (direction) {
      case "next":
        this.handleNextItem();
        break;
      case "previous":
        this.handlePreviousItem();
        break;
      default:
        console.error("invalid direction");
    }
  };

  onRevisionSelect = (revision: string) => {
    console.log("revision", revision);
  };

  renderItemBankEntry() {
    const { sections, items } = this.state;
    let content: JSX.Element | undefined;

    const sectionsContent = getResourceContent(sections);
    if (sectionsContent) {
      content = (
        <ItemBankEntry
          updateItems={this.handleUpdateItems}
          sections={sectionsContent}
          items={items}
        />
      );
    }

    return content;
  }

  renderItemBankViewer() {
    const {
      itemUrl,
      aboutItemRevisionModel,
      accResourceGroups,
      revisions,
      currentItem,
      previousItem,
      nextItem
    } = this.state;
    let content: JSX.Element | undefined;

    const aboutItemContent = getResourceContent(aboutItemRevisionModel);
    const accResourceGroupsContent = getResourceContent(accResourceGroups);
    const revisionsContent = getResourceContent(revisions);

    content = (
      <ItemBankViewer
        onAccessibilityUpdate={this.onAccessibilityUpdate}
        onAccessibilityReset={this.onAccessibilityReset}
        onItemSelect={this.onItemSelect}
        onRevisionSelect={this.onRevisionSelect}
        itemUrl={itemUrl}
        aboutItemRevisionModel={aboutItemContent}
        accResourceGroups={accResourceGroupsContent}
        revisions={revisionsContent}
        nextItem={nextItem}
        prevItem={previousItem}
      />
    );

    return content;
  }

  render() {
    const {
      itemUrl,
      aboutItemRevisionModel,
      accResourceGroups,
      sections,
      items
    } = this.state;

    return (
      <div className="item-container container">
        <div>
          {this.renderItemBankEntry()}
          {this.renderItemBankViewer()}
        </div>
      </div>
    );
  }
}
