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
  getPreviousItemBank,
  toiSAAP,
  AccessibilityResourceModel
} from "@src/index";

export interface ItemBankContainerProps {
  accessibilityClient: (
    acc: AccessibilityRevisionModel
  ) => Promise<AccResourceGroupModel[]>;
  aboutItemRevisionClient: (
    item: ItemRevisionModel
  ) => Promise<AboutItemRevisionModel>;
  revisionsClient: (item: ItemRevisionModel) => Promise<RevisionModel[]>;
  sectionsClient: () => Promise<SectionModel[]>;
  itemViewUrl?: string;
  items?: ItemRevisionModel[];
  getUrl: (item: ItemRevisionModel) => string;
}

export interface ItemBankContainerState {
  aboutItemRevisionModel: Resource<AboutItemRevisionModel>;
  accResourceGroups: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemRevisionModel;
  items: ItemRevisionModel[];
  sections: Resource<SectionModel[]>;
  revisions: Resource<RevisionModel[]>;
  nextItem?: ItemRevisionModel;
  previousItem?: ItemRevisionModel;
  hasError: boolean;
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
      sections: { kind: "loading" },
      revisions: { kind: "loading" },
      hasError: false
    };
  }

  componentDidMount() {
    this.fetchSections().catch(e => this.onError(e));
    this.handleChangeViewItem();
    this.handleChangeRevision();
  }

  componentWillUnmount() {
    this.subscription.cancelAll();
  }

  async fetchAboutItemRevisionModel(
    item: ItemRevisionModel
  ): Promise<AboutItemRevisionModel> {
    const prom = this.props.aboutItemRevisionClient(item);
    const promiseWrapper = this.subscription.add(
      "aboutItemRevisionClient",
      prom
    );

    const aboutItemRevisionModel = await promiseWrapper.promise;
    this.onFetchAboutItemSuccess(aboutItemRevisionModel);

    return aboutItemRevisionModel;
  }

  onFetchAboutItemSuccess(data: AboutItemRevisionModel) {
    this.setState({
      aboutItemRevisionModel: { kind: "success", content: data }
    });
  }

  async fetchAccResourceGroups(item: AboutItemRevisionModel) {
    const params: AccessibilityRevisionModel = {
      interactionType: item.AboutItemMetadata.interactionType,
      subject: item.AboutItemMetadata.subject,
      gradeLevel: item.AboutItemMetadata.intendedGrade
    };

    const prom = this.props.accessibilityClient(params);
    const promiseWrapper = this.subscription.add("accessibilityClient", prom);
    const accessibilityResources = await promiseWrapper.promise;
    this.onFetchAccResourceSuccess(accessibilityResources);

    return accessibilityResources;
  }

  onFetchAccResourceSuccess(data: AccResourceGroupModel[]) {
    this.setState({ accResourceGroups: { kind: "success", content: data } });
  }

  async fetchRevisions(item: ItemRevisionModel) {
    const prom = this.props.revisionsClient(item);
    const promiseWrapper = this.subscription.add("revisionsClient", prom);
    const revisions = await promiseWrapper.promise;
    this.onFetchRevisionsSuccess(revisions);

    return revisions;
  }

  onFetchRevisionsSuccess(data: RevisionModel[]) {
    this.setState({ revisions: { kind: "success", content: data } });
  }

  async fetchSections() {
    const prom = this.props.sectionsClient();
    const promiseWrapper = this.subscription.add("sectionsClient", prom);
    const sections = await promiseWrapper.promise;
    this.onFetchSectionsSuccess(sections);

    return sections;
  }

  onFetchSectionsSuccess(data: SectionModel[]) {
    this.setState({ sections: { kind: "success", content: data } });
  }

  onError(err: string) {
    if (err !== "Canceled") {
      this.setState({
        hasError: true
      });
    }
  }

  handleUpdateItems = (items: ItemRevisionModel[]) => {
    const currentItem = items.length > 0 ? items[0] : undefined;
    const lastItem = items[items.length - 1];
    if (validItemRevisionModel(lastItem) || items.length === 0) {
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
      this.fetchAboutItemRevisionModel(currentItem)
        .then(aboutItem => {
          this.fetchAccResourceGroups(aboutItem)
            .then(accGroups => this.handleUpdateIsaap(accGroups))
            .catch(e => this.onError(e));
        })
        .catch(e => this.onError(e));

      const nextItem = getNextItemBank(currentItem, items);
      const previousItem = getPreviousItemBank(currentItem, items);

      this.setState({ nextItem, previousItem });
    }
  };

  handleUpdateIsaap = (accGroups: AccResourceGroupModel[]) => {
    const { currentItem } = this.state;

    if (currentItem) {
      const isaap = toiSAAP(accGroups);
      const newItem = { ...currentItem, isaap };
      this.props.getUrl(currentItem);
      this.setState({ currentItem });
    }
  };

  handleChangeRevision = () => {
    const { currentItem } = this.state;
    if (currentItem) {
      this.fetchRevisions(currentItem).catch(e => this.onError(e));
    }
  };

  onAccessibilityUpdate = (accResourceGroups: AccResourceGroupModel[]) => {
    this.setState(
      {
        accResourceGroups: {
          kind: "success",
          content: accResourceGroups
        }
      },
      () => this.handleUpdateIsaap(accResourceGroups)
    );
  };

  onAccessibilityReset = () => {
    const {
      aboutItemRevisionModel,
      currentItem,
      accResourceGroups
    } = this.state;
    const aboutItem = getResourceContent(aboutItemRevisionModel);
    const accResources = getResourceContent(accResourceGroups);
    if (aboutItem && accResources) {
      this.setState({ currentItem: { ...currentItem, isaap: undefined } }, () =>
        this.handleUpdateIsaap(accResources)
      );
    }
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

  onDirectionSelect = (direction: "next" | "previous") => {
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

  onItemSelect = (item: string) => {
    const { revisions, items } = this.state;
    let { currentItem } = this.state;
    let revisionContent = getResourceContent(revisions);
    if (currentItem && revisionContent) {
      currentItem = items.find(i => i.itemKey === Number(item));
      revisionContent = revisionContent.map(r => {
        return { ...r };
      });
    }
    this.setState(
      { currentItem, revisions: { kind: "success", content: revisionContent } },
      this.handleChangeViewItem
    );
  };

  onRevisionSelect = (revision: string) => {
    const { currentItem, revisions } = this.state;
    let revisionContent = getResourceContent(revisions);
    if (currentItem && revisionContent) {
      currentItem.revision = revision;
      revisionContent = revisionContent.map(r => {
        return { ...r, selected: r.commitHash === revision };
      });
    }
    this.setState(
      { currentItem, revisions: { kind: "success", content: revisionContent } },
      this.handleChangeViewItem
    );
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
      aboutItemRevisionModel,
      accResourceGroups,
      revisions,
      currentItem,
      previousItem,
      nextItem,
      items
    } = this.state;
    let content: JSX.Element | undefined;

    const aboutItemContent = getResourceContent(aboutItemRevisionModel);
    const accResourceGroupsContent = getResourceContent(accResourceGroups);
    const revisionsContent = getResourceContent(revisions);

    content = (
      <ItemBankViewer
        onAccessibilityUpdate={this.onAccessibilityUpdate}
        onAccessibilityReset={this.onAccessibilityReset}
        onDirectionSelect={this.onDirectionSelect}
        onRevisionSelect={this.onRevisionSelect}
        onItemSelect={this.onItemSelect}
        itemUrl={this.props.itemViewUrl}
        aboutItemRevisionModel={aboutItemContent}
        accResourceGroups={accResourceGroupsContent}
        revisions={revisionsContent}
        nextItem={nextItem}
        prevItem={previousItem}
        currentItem={currentItem}
        items={items}
      />
    );

    return content;
  }

  render() {
    const {
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
