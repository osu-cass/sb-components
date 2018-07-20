import * as React from "react";
import {
  AboutItemRevisionModel,
  AccResourceGroupModel,
  AdvancedAboutItem,
  ItemAccessibilityModal,
  ItemViewerFrame,
  ResourceSelectionsModel,
  RevisionContainer,
  Revision,
  ItemRevisionModel,
  itemRevisionKey,
  getItemBankName,
  concatNamespaceWith,
  RevisionModel,
  RubricModal,
  SelectOptionProps,
  Select,
  validItemRevisionModel
} from "@src/index";

export interface ItemBankViewerProps {
  onAccessibilityUpdate: (accResourceGroups: AccResourceGroupModel[]) => void;
  onAccessibilityReset: () => void;
  onDirectionSelect: (direction: "next" | "previous") => void;
  onItemSelect: (itemKey: string) => void;
  onRevisionSelect: (revision: string) => void;
  itemUrl?: string;
  aboutItemRevisionModel?: AboutItemRevisionModel;
  accResourceGroups?: AccResourceGroupModel[];
  revisions?: RevisionModel[];
  nextItem?: ItemRevisionModel;
  prevItem?: ItemRevisionModel;
  currentItem?: ItemRevisionModel;
  items?: ItemRevisionModel[];
}

export class ItemBankViewer extends React.Component<ItemBankViewerProps, {}> {
  constructor(props: ItemBankViewerProps) {
    super(props);
  }

  renderRightNav(): JSX.Element | undefined {
    const {
      onAccessibilityUpdate,
      onAccessibilityReset,
      accResourceGroups
    } = this.props;
    const accessibilityModal = accResourceGroups ? (
      <ItemAccessibilityModal
        accResourceGroups={accResourceGroups}
        onSave={onAccessibilityUpdate}
        onReset={onAccessibilityReset}
      />
    ) : (
      undefined
    );

    let content: JSX.Element | undefined;
    content = (
      <div
        className="item-nav-right-group"
        role="group"
        aria-label="Second group"
      >
        {accessibilityModal}
      </div>
    );

    return content;
  }

  renderNavButton(direction: "next" | "previous") {
    const { onDirectionSelect, nextItem, prevItem } = this.props;
    let itemName: string | undefined;
    let item = nextItem;
    if (direction === "previous") {
      itemName = prevItem ? getItemBankName(prevItem) : "Previous";
      item = prevItem;
    } else {
      itemName = nextItem ? getItemBankName(nextItem) : "Next";
    }

    return (
      <button
        onClick={() => onDirectionSelect(direction)}
        className={`btn btn-link ${direction}`}
        disabled={item ? false : true}
      >
        <div className="nav-button-container">
          <span
            className={
              direction === "previous"
                ? "fa fa-arrow-left"
                : "fa fa-arrow-right"
            }
            aria-hidden="true"
          />
          <div className="nav-item-name">{itemName}</div>
        </div>
      </button>
    );
  }

  renderItemDropDown() {
    let options: SelectOptionProps[] | undefined;
    const { onItemSelect, currentItem } = this.props;
    const selectedKey = currentItem ? itemRevisionKey(currentItem) : "NA";
    if (this.props.items) {
      options = this.props.items.map(op => {
        const itemKey = itemRevisionKey(op);

        return {
          key: itemKey,
          label: concatNamespaceWith(getItemBankName(op), op) || "",
          value: itemKey,
          selected: selectedKey === itemKey
        };
      });
    }

    if (options) {
      options.unshift({
        label: "Select an Item",
        value: "N/A",
        disabled: true,
        selected: false
      });

      return (
        <Select
          label="Items"
          labelClass="display-none"
          selected={selectedKey}
          options={options}
          onChange={onItemSelect}
          wrapperClass="select-dd"
          className="item-dropdown"
        />
      );
    }
  }

  renderMidNav() {
    const { onItemSelect, nextItem, prevItem } = this.props;
    const nextItemName = nextItem ? getItemBankName(nextItem) : " ";
    const previousItemName = prevItem ? getItemBankName(prevItem) : " ";

    return (
      <div className="nav-buttons">
        {this.renderNavButton("previous")}
        {this.renderItemDropDown()}
        {this.renderNavButton("next")}
      </div>
    );
  }

  renderRubricModal(): JSX.Element | undefined {
    const { aboutItemRevisionModel } = this.props;
    let content: JSX.Element | undefined;
    if (
      aboutItemRevisionModel &&
      aboutItemRevisionModel.sampleItemScoring &&
      aboutItemRevisionModel.sampleItemScoring.rubrics
    ) {
      const rubrics = aboutItemRevisionModel.sampleItemScoring.rubrics;
      content = <RubricModal rubrics={rubrics} />;
    }

    return content;
  }

  renderAdvancedAboutItem(): JSX.Element | undefined {
    const { aboutItemRevisionModel } = this.props;

    return aboutItemRevisionModel ? (
      <AdvancedAboutItem {...aboutItemRevisionModel} />
    ) : (
      undefined
    );
  }

  renderNavBar(): JSX.Element | undefined {
    const { aboutItemRevisionModel, accResourceGroups } = this.props;
    const aboutItemElement = this.renderAdvancedAboutItem();
    let content: JSX.Element | undefined;
    content = (
      <div
        className="item-nav"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div
          className="item-nav-left-group"
          role="group"
          aria-label="First group"
        >
          {aboutItemElement}
          {this.renderRubricModal()}
        </div>
        {this.renderMidNav()}
        {this.renderRightNav()}
      </div>
    );

    return content;
  }

  render() {
    const { itemUrl, revisions, onRevisionSelect } = this.props;

    return (
      <div className="section revisions-items">
        <RevisionContainer
          revisions={revisions || []}
          onRevisionSelect={onRevisionSelect}
        />
        <div
          className="section item-map-iframe"
          aria-live="polite"
          aria-relevant="additions"
        >
          {this.renderNavBar()}
          <ItemViewerFrame url={itemUrl} title={"item viewer"} />
        </div>
      </div>
    );
  }
}
