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
  toiSAAP,
  ItemExistsRequestModel,
  ItemExistsResponseModel,
  toExistenceRequestModel,
  existenceResponseModelToRevisionModel,
  mergeAccessibilityGroups,
  resetAccessibilityGroups
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
  namespaces: NamespaceModel[];
  itemViewUrl?: string;
  items?: ItemRevisionModel[];
  setUrl: (item: ItemRevisionModel) => void;
  resetUrl: () => void;
  itemExistsClient: (
    items: ItemExistsRequestModel[]
  ) => Promise<ItemExistsResponseModel[]>;
}

export interface ItemBankContainerState {
  aboutItemRevisionModel: Resource<AboutItemRevisionModel>;
  accResourceGroups: Resource<AccResourceGroupModel[]>;
  currentItem?: ItemRevisionModel;
  items: ItemRevisionModel[];
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
      revisions: { kind: "loading" },
      hasError: false
    };
  }

  componentDidMount() {
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
      allowCalculator: this.calculatorAllowed(item),
      itemKey: item.AboutItemMetadata.identifier,
      bankKey: item.bankKey,
      namespace: item.namespace
    };
    const prom = this.props.accessibilityClient(params);
    const promiseWrapper = this.subscription.add("accessibilityClient", prom);
    const accessibilityResources = await promiseWrapper.promise;
    this.onFetchAccResourceSuccess(accessibilityResources);

    return accessibilityResources;
  }

  // Changes allowCalculator from "yes"/"no"/null to bool
  calculatorAllowed(item: AboutItemRevisionModel) {
    if (
      item.AboutItemMetadata &&
      item.AboutItemMetadata.allowCalculator &&
      item.AboutItemMetadata.allowCalculator.toLowerCase() === "yes"
    ) {
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
    revisions[0].selected = true;
    this.onFetchRevisionsSuccess(revisions);

    return revisions.reverse();
  }

  onFetchRevisionsSuccess(data: RevisionModel[]) {
    this.setState({ revisions: { kind: "success", content: data } });
  }

  handleSubmit = (items: ItemRevisionModel[]) => {
    this.checkValidItems(items);
  };

  async checkValidItems(items: ItemRevisionModel[]) {
    const requestItems = toExistenceRequestModel(items);
    const prom = this.props.itemExistsClient(requestItems);
    const promiseWrapper = this.subscription.add("itemExistsClient", prom);
    const itemsResponse = await promiseWrapper.promise;

    const validItems = existenceResponseModelToRevisionModel(
      items,
      itemsResponse
    );

    this.handleUpdateItems(validItems);
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

  handleUpdateItems = (items: ItemRevisionModel[]) => {
    let currentItem: ItemRevisionModel | undefined;
    if (items.length > 1) {
      const itemMatch = items.filter(
        item => itemsAreEqual(this.state.currentItem, item) || false
      );
      currentItem = itemMatch.length > 0 ? itemMatch[0] : items[0];
    } else {
      currentItem = undefined;
    }
    if (items[items.length - 1].itemKey) {
      items.push({});
    }

    this.setState({ currentItem, items }, () => {
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
      currentItem: undefined,
      revisions: { kind: "none" }
    });
  };

  /**
   * Updates prev and next items. Updates rubric, about item, and item url
   * @memberof ItemBankContainer
   */
  handleChangeViewItem = () => {
    const { currentItem, items, accResourceGroups } = this.state;
    const currentAccGroups = getResourceContent(accResourceGroups);
    let index = 0;
    if (currentItem && currentItem.valid) {
      this.fetchAboutItemRevisionModel(currentItem)
        .then(aboutItem => {
          return this.fetchAccResourceGroups(aboutItem);
        })
        .then(accGroups => {
          let newGroups: AccResourceGroupModel[];
          if (currentAccGroups) {
            newGroups = mergeAccessibilityGroups(accGroups, currentAccGroups);
          } else {
            newGroups = accGroups;
          }
          this.setState(
            { accResourceGroups: { kind: "success", content: newGroups } },
            () => {
              this.handleUpdateIsaap(newGroups);
              this.updateNavigationItems();
            }
          );
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
      currentItem.isaap = toiSAAP(accGroups);
      this.setState({ currentItem }, () => {
        this.props.setUrl(currentItem);
      });
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
      const resetResources = resetAccessibilityGroups(accResources);
      this.setState(
        {
          currentItem: { ...currentItem, isaap: undefined },
          accResourceGroups: { kind: "success", content: resetResources }
        },
        () => this.handleUpdateIsaap(resetResources)
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

  onRevisionSelect = (revision: string) => {
    const { currentItem, revisions } = this.state;
    let revisionContent = getResourceContent(revisions);
    if (currentItem && revisionContent) {
      currentItem.revision = revision;
      revisionContent = revisionContent.map(r => {
        return { ...r, selected: r.commitHash === revision };
      });
      if (!currentItem.valid) {
        currentItem.valid = true;
      }
    }
    this.setState(
      { currentItem, revisions: { kind: "success", content: revisionContent } },
      this.handleChangeViewItem
    );
  };

  renderItemBankEntry() {
    const { namespaces } = this.props;
    const { items } = this.state;

    return (
      <ItemBankEntry
        namespaces={namespaces}
        items={items}
        deleteItem={this.deleteItem}
        clearItems={this.clearItems}
        submitItems={this.handleSubmit}
      />
    );
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
