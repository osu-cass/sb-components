import * as React from "react";
import {
  getResourceContent,
  AccResourceGroupModel,
  AboutItemRevisionModel,
  Resource,
  Subscription,
  ItemRevisionModel,
  itemRevisionKey,
  NamespaceModel,
  SectionModel,
  AccessibilityRevisionModel,
  validItemRevisionModel,
  RevisionModel,
  ItemBankViewer,
  ItemBankEntry,
  getNextItemBank,
  getPreviousItemBank,
  toiSAAP
} from "@src/index";
import { itemsAreEqual } from "@src/ItemBank/ItemBankModels";

export interface ItemBankContainerProps {
  accessibilityClient: (
    acc: AccessibilityRevisionModel
  ) => Promise<AccResourceGroupModel[]>;
  aboutItemRevisionClient: (
    item: ItemRevisionModel
  ) => Promise<AboutItemRevisionModel>;
  revisionsClient: (item: ItemRevisionModel) => Promise<RevisionModel[]>;
  namespacesClient: () => Promise<NamespaceModel[]>;
  sectionsClient: () => Promise<SectionModel[]>;
  itemViewUrl?: string;
  items?: ItemRevisionModel[];
  setUrl: (item: ItemRevisionModel) => void;
  resetUrl: () => void;
}

export interface ItemBankContainerState {
  aboutItemRevisionModel: Resource<AboutItemRevisionModel>;
  accResourceGroups: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemRevisionModel;
  csvText: string;
  items: ItemRevisionModel[];
  namespaces: Resource<NamespaceModel[]>;
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
      csvText: "",
      aboutItemRevisionModel: { kind: "loading" },
      accResourceGroups: { kind: "loading" },
      namespaces: { kind: "loading" },
      sections: { kind: "loading" },
      revisions: { kind: "loading" },
      hasError: false
    };
  }

  componentDidMount() {
    this.fetchNamespaces().catch(e => this.onError(e));
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
      gradeLevel: item.AboutItemMetadata.intendedGrade,
      allowCalculator: this.makeBool(item),
      itemKey: item.AboutItemMetadata.identifier,
      bankKey: item.bankKey
    };
    const prom = this.props.accessibilityClient(params);
    const promiseWrapper = this.subscription.add("accessibilityClient", prom);
    const accessibilityResources = await promiseWrapper.promise;
    this.onFetchAccResourceSuccess(accessibilityResources);

    return accessibilityResources;
  }

  // Changes allowCalculator from "yes"/"no"/null to bool

  makeBool(item: AboutItemRevisionModel) {
    if (item.AboutItemMetadata.allowCalculator === "Yes") {
      return true;
    }

    return false;
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

  async fetchNamespaces() {
    const prom = this.props.namespacesClient();
    const promiseWrapper = this.subscription.add("namespacesClient", prom);
    const namespaces = await promiseWrapper.promise;
    this.onFetchNamespacesSuccess(namespaces);

    return namespaces;
  }

  onFetchNamespacesSuccess(data: NamespaceModel[]) {
    this.setState({ namespaces: { kind: "success", content: data } });
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

  onError(err: string, cb?: () => void) {
    if (err !== "Canceled") {
      this.setState(
        {
          hasError: true
        },
        cb
      );
    }
  }

  handleUpdateCsvText = (csvText: string) => {
    this.setState({ csvText });
  };

  handleUpdateItems = (items: ItemRevisionModel[]) => {
    const currentItem = items.length > 0 ? items[0] : undefined;
    const lastItem = items[items.length - 1];
    items.forEach(item => {
      if (!validItemRevisionModel(item) && item !== lastItem) {
        item.valid = false;
      } else {
        item.valid = true;
      }
    });
    if (validItemRevisionModel(lastItem) || items.length === 0) {
      items.push({});
    }
    this.setState({ items, currentItem }, () => {
      this.handleChangeViewItem();
      this.handleChangeRevision();
    });
  };

  componentWillUpdate(
    props: ItemBankContainerProps,
    state: ItemBankContainerState
  ) {
    if (
      !state.currentItem &&
      !state.nextItem &&
      !state.previousItem &&
      this.state.currentItem
    ) {
      this.props.resetUrl();
    } else if (state.items !== this.state.items && state.items.length > 1) {
      this.handleChangeViewItem();
    }
  }

  deleteItem = (key: number) => {
    this.setState(state => {
      let currentItem = state.currentItem;
      let nextItem = state.nextItem;
      let previousItem = state.previousItem;
      if (itemsAreEqual(state.items[key], currentItem)) {
        if (state.previousItem) {
          currentItem = state.previousItem;
        } else if (state.nextItem) {
          currentItem = state.nextItem;
        } else if (state.items.length === 2) {
          currentItem = undefined;
          nextItem = undefined;
          previousItem = undefined;
        }
      }

      return {
        currentItem,
        nextItem,
        previousItem,
        items: state.items.filter((i, index) => key !== index)
      };
    });
  };

  clearItems = () => {
    this.setState({
      items: [{}],
      previousItem: undefined,
      nextItem: undefined,
      currentItem: undefined
    });
  };

  /**
   * Updates prev and next items. Updates rubric, about item, and item url
   * @memberof ItemBankContainer
   */
  handleChangeViewItem = () => {
    const { currentItem, items } = this.state;
    let index = 0;

    if (currentItem && currentItem.valid) {
      this.fetchAboutItemRevisionModel(currentItem)
        .then(aboutItem => {
          this.fetchAccResourceGroups(aboutItem)
            .then(accGroups => this.handleUpdateIsaap(accGroups))
            .catch(e => this.onError(e));
          this.updateNavigationItems();
        })
        .catch(e => {
          this.onError(e, () => {
            if (items.length > 1) {
              index = items.findIndex(i => i === currentItem);
              items[index].valid = false;
              this.setState({ items }, this.updateNavigationItems);
            }
          });
        });
    }
  };

  updateNavigationItems = () => {
    const { currentItem, items } = this.state;
    if (currentItem) {
      const nextItem = getNextItemBank(currentItem, items);
      const previousItem = getPreviousItemBank(currentItem, items);

      this.setState({ currentItem, nextItem, previousItem });
    } else {
      this.setState({ nextItem: undefined, previousItem: undefined });
    }
  };

  handleUpdateIsaap = (accGroups: AccResourceGroupModel[]) => {
    const { currentItem } = this.state;

    if (currentItem) {
      const isaap = toiSAAP(accGroups);
      this.props.setUrl(currentItem);
      this.setState({ currentItem });
      this.bubbleEventHandler(currentItem, isaap);
    }
  };

  bubbleEventHandler = (currentItem: ItemRevisionModel, isaap: string) => {
    const newItem = { ...currentItem, isaap };
    const x = document;
    const event = new CustomEvent("acc-update", { detail: newItem.isaap });
    if (x !== null) {
      x.dispatchEvent(event);
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
        throw new Error("invalid direction");
    }
  };

  onItemSelect = (item: string) => {
    const { revisions, items } = this.state;
    let { currentItem } = this.state;
    if (currentItem) {
      currentItem = items.find(i => itemRevisionKey(i) === item);
    }
    this.setState({ currentItem }, () => {
      this.handleChangeViewItem();
      this.handleChangeRevision();
    });
  };

  submitItems = (items: ItemRevisionModel[]) => {
    // will need to do more stuff here.
    if (items.length >= 2) {
      this.setState({ items });
    } else {
      this.clearItems();
    }
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
    const { namespaces, sections, items, csvText } = this.state;
    let content: JSX.Element | undefined;

    const namespacesContent = getResourceContent(namespaces);
    const sectionsContent = getResourceContent(sections);
    if (namespacesContent && sectionsContent) {
      content = (
        <ItemBankEntry
          updateCsvText={this.handleUpdateCsvText}
          updateItems={this.handleUpdateItems}
          namespaces={namespacesContent}
          sections={sectionsContent}
          csvText={csvText}
          items={items}
          deleteItem={this.deleteItem}
          clearItems={this.clearItems}
          submitItems={this.submitItems}
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
