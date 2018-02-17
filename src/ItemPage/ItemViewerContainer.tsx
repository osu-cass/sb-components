/// <reference types="google.analytics" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import * as Accessibility from "../Accessibility/AccessibilityModels";
import * as AccessibilityModal from "../Accessibility/AccessibilityModal";
import * as Dropdown from "../DropDown/DropDown";
import * as Braille from "../Accessibility/Braille";
import * as ItemPageModels from "./ItemPageModels";
import {
  MoreLikeThisModal,
  AboutItem,
  AboutPTModal,
  AboutPTPopupModal,
  ShareModal,
  ItemViewerFrame,
  ItemAccessibilityModal,
  AboutItemModel,
  IframeModal,
  AccResourceGroupModel,
  ResourceSelectionsModel
} from "../index";

const calculatorURL = "http://calculator.smarterbalanced.org";
export interface ItemViewerContainerProps extends ItemPageModels.ItemPageModel {
  onSave: (selections: ResourceSelectionsModel) => void;
  onReset: () => void;
  aboutThisItemVM: AboutItemModel;
  currentItem: ItemPageModels.ItemIdentifierModel;
  accResourceGroups: AccResourceGroupModel[];
  showRubrics: boolean;
}

export class ItemViewerContainer extends React.Component<
  ItemViewerContainerProps,
  {}
> {
  constructor(props: ItemViewerContainerProps) {
    super(props);
  }

  saveOptions = (resourceSelections: ResourceSelectionsModel): void => {
    this.props.onSave(resourceSelections);
  };

  renderPerformanceModals() {
    let content: JSX.Element | undefined;
    if (this.props.isPerformanceItem) {
      content = (
        <div className="peformance-modals">
          <AboutPTPopupModal
            subject={this.props.subject}
            description={this.props.performanceItemDescription}
            isPerformance={this.props.isPerformanceItem}
          />
          <AboutPTModal
            subject={this.props.subject}
            description={this.props.performanceItemDescription}
          />
        </div>
      );
    }

    return content;
  }

  renderNav(): JSX.Element {
    return (
      <div
        className="item-nav"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        {this.renderLeftNav()}
        {this.renderRightNav()}
      </div>
    );
  }

  renderCalculatorNav(): JSX.Element | undefined {
    const enabled = Accessibility.isCalculatorEnabled(
      this.props.accResourceGroups
    );
    let content: JSX.Element | undefined;
    if (enabled) {
      content = (
        <IframeModal
          url={calculatorURL}
          title="About Calculators"
          btnText="About Calculators"
          btnClass="item-nav-btn btn btn-default btn-sm"
          btnIcon="fa fa-calculator"
        />
      );
    }

    return content;
  }

  renderBrailleNav(): JSX.Element | undefined {
    const enabled = Accessibility.isBrailleEnabled(
      this.props.accResourceGroups
    );
    let content: JSX.Element | undefined;

    if (enabled) {
      content = (
        <Braille.BrailleLink
          currentSelectionCode={Accessibility.getBrailleAccommodation(
            this.props.accResourceGroups
          )}
          brailleItemCodes={this.props.brailleItemCodes}
          braillePassageCodes={this.props.braillePassageCodes}
          bankKey={this.props.currentItem.bankKey}
          itemKey={this.props.currentItem.itemKey}
        />
      );
    }

    return content;
  }

  renderLeftNav(): JSX.Element {
    const isaap = ItemPageModels.toiSAAP(
      this.props.accResourceGroups,
      this.props.defaultIsaapCodes
    );

    return (
      <div
        className="item-nav-left-group"
        role="group"
        aria-label="First group"
      >
        <AboutItem
          showRubrics={this.props.showRubrics}
          {...this.props.aboutThisItemVM}
        />

        <MoreLikeThisModal {...this.props.moreLikeThisVM} />
        <ShareModal iSAAP={isaap} />
        {this.renderPerformanceModals()}
        {this.renderBrailleNav()}
        {this.renderCalculatorNav()}
      </div>
    );
  }

  renderRightNav(): JSX.Element {
    return (
      <div
        className="item-nav-right-group"
        role="group"
        aria-label="Second group"
      >
        <ItemAccessibilityModal
          accResourceGroups={this.props.accResourceGroups}
          onSave={this.props.onSave}
          onReset={this.props.onReset}
        />
      </div>
    );
  }

  renderIFrame(): JSX.Element {
    const isaap = ItemPageModels.toiSAAP(
      this.props.accResourceGroups,
      this.props.defaultIsaapCodes
    );
    const itemNames = Accessibility.isBrailleEnabled(
      this.props.accResourceGroups
    )
      ? this.props.brailleItemNames
      : this.props.itemNames;
    const scrollTo: string = Accessibility.isStreamlinedEnabled(
      this.props.accResourceGroups
    )
      ? ""
      : "&scrollToId=".concat(this.props.currentItem.itemName);
    const ivsUrl: string = this.props.itemViewerServiceUrl.concat(
      "/items?ids=",
      itemNames,
      "&isaap=",
      isaap,
      scrollTo
    );

    return <ItemViewerFrame url={ivsUrl} />;
  }

  render() {
    return (
      <div>
        {this.renderNav()}
        {this.renderIFrame()}
      </div>
    );
  }
}
