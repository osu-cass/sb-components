/// <reference types="google.analytics" />
import * as React from "react";
import {
  AccessibilityResourceModel,
  AccResourceGroupModel,
  ResourceSelectionsModel,
  getResourceTypes
} from "./AccessibilityModels";
import { Dropdown, DropdownProps } from "../index";
import * as ReactModal from "react-modal";

export interface ItemAccessibilityModalProps {
  accResourceGroups: AccResourceGroupModel[];
  onSave(selections: ResourceSelectionsModel): void;
  onReset(): void;
  showModal?: boolean;
}

export interface IsResourceExpanded {
  [resourceType: string]: boolean;
}

export interface ItemAccessibilityModalState {
  resourceTypeExpanded: IsResourceExpanded;
  resourceSelections: ResourceSelectionsModel;
  showModal: boolean;
}

export class ItemAccessibilityModal extends React.Component<
  ItemAccessibilityModalProps,
  ItemAccessibilityModalState
> {
  constructor(props: ItemAccessibilityModalProps) {
    super(props);

    const expandeds: IsResourceExpanded = {};
    const resourceTypes = this.props.accResourceGroups.map(res => {
      return res.label;
    });
    for (const key of resourceTypes) {
      expandeds[key] = false;
    }
    this.state = {
      resourceTypeExpanded: expandeds,
      resourceSelections: {},
      showModal: this.props.showModal || false
    };
  }

  toggleResourceType(resourceType: string) {
    const expandeds = Object.assign({}, this.state.resourceTypeExpanded || {});
    expandeds[resourceType] = !expandeds[resourceType];

    this.setState({
      resourceTypeExpanded: expandeds
    });
  }

  keyboardToggleResourceType(
    e: React.KeyboardEvent<HTMLAnchorElement>,
    resourceType: string
  ): void {
    if (e.keyCode === 23 || e.keyCode === 13) {
      const expandeds = { ...this.state.resourceTypeExpanded };
      expandeds[resourceType] = !expandeds[resourceType];

      this.setState({
        resourceTypeExpanded: expandeds
      });
    }
  }

  // Updates the selection based on user input, if item is braille, streamlined mode needs to be adjusted
  updateSelection = (selectionCode: string, resourceCode: string) => {
    const newSelections = { ...this.state.resourceSelections };
    newSelections[resourceCode] = selectionCode;
    if (resourceCode === "BrailleType") {
      if (selectionCode === "TDS_BT0") {
        newSelections["StreamlinedInterface"] = "TDS_SLM0";
      } else {
        newSelections["StreamlinedInterface"] = "TDS_SLM1";
      }
    }
    this.setState({ resourceSelections: newSelections });
  };

  onSave = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    this.props.onSave(this.state.resourceSelections || {});
    this.setState({ showModal: false });
  };

  onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ resourceSelections: {}, showModal: false });
  };

  onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ resourceSelections: {}, showModal: false });
    this.props.onReset();
  };

  handleShowModal = () => {
    if (!this.state.showModal) {
      ga("send", "event", "button", "OpenAccessibility");
    }

    this.setState({ showModal: true });
  };

  handleHideModal = () => {
    this.setState({ showModal: false });
  };

  renderResourceType(resourceType: string) {
    let resources = this.props.accResourceGroups.filter(
      group => group.label === resourceType
    )[0].accessibilityResources;
    const resourceTypeHeader = (
      <h4 className="green-title">
        <span className="fa fa-tasks" />&nbsp;
        {resourceType}
      </h4>
    );

    const resCount = resources.length;
    const isExpanded = (this.state.resourceTypeExpanded || {})[resourceType];
    if (!isExpanded) {
      resources = resources.slice(0, 4);
    }

    const dropdowns = resources.map(res => {
      const selectedCode =
        (this.state.resourceSelections || {})[res.resourceCode] ||
        res.currentSelectionCode;
      const selections = res.selections.filter(s => !s.hidden);
      const ddProps: DropdownProps = {
        selections,
        defaultSelection: res.currentSelectionCode,
        label: res.label,
        selectionCode: selectedCode,
        disabled: res.disabled,
        updateSelection: this.updateSelection,
        resourceCode: res.resourceCode
      };

      return <Dropdown {...ddProps} key={res.resourceCode} />;
    });

    let expandButton: JSX.Element | undefined;
    if (resCount <= 4) {
      expandButton = undefined;
    } else if (isExpanded) {
      const ariaText = `Display fewer ${resourceType} options`;
      expandButton = (
        <a
          role="button"
          className="expand-button"
          tabIndex={0}
          aria-label={ariaText}
          onClick={() => this.toggleResourceType(resourceType)}
          onKeyUp={e => this.keyboardToggleResourceType(e, resourceType)}
        >
          Show less
        </a>
      );
    } else {
      const ariaText = `Display all ${resourceType} options`;
      expandButton = (
        <a
          role="button"
          className="expand-button"
          tabIndex={0}
          aria-label={ariaText}
          onClick={() => this.toggleResourceType(resourceType)}
          onKeyUp={e => this.keyboardToggleResourceType(e, resourceType)}
        >
          Show all
        </a>
      );
    }

    return (
      <div
        className="accessibility-resource-type section section-light"
        key={resourceType}
      >
        {resourceTypeHeader}
        <div className="accessibility-dropdowns">{dropdowns}</div>
        {expandButton}
      </div>
    );
  }

  render() {
    const types = getResourceTypes(this.props.accResourceGroups);
    const groups = types.map(t => this.renderResourceType(t));

    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={this.handleShowModal}
          aria-label="Open Accessibility Modal"
          tabIndex={0}
        >
          <span className="fa fa-caret-square-o-down" aria-hidden="true" />
          Accessibility
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Accessibility Modal"
          onRequestClose={this.handleHideModal}
          overlayClassName="react-modal-overlay"
          className="react-modal-content accessibility-modal"
        >
          <div className="modal-wrapper">
            <div className="modal-header">
              <h4 className="modal-title">Accessibility Options</h4>
              <button
                className="close"
                onClick={this.handleHideModal}
                aria-label="Close accessibility options"
              >
                <span className="fa fa-times" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span>
                  Options displayed in grey are not available for this item.
                </span>
              </p>
              <form id="accessibility-form" onSubmit={this.onSave}>
                <div className="accessibility-groups">{groups}</div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-sm btn-primary"
                aria-label="Update options and reload item"
                form="accessibility-form"
                onClick={this.onSave}
              >
                {" "}
                Update
              </button>
              <button
                className="btn btn-sm btn-primary"
                aria-label="Reset all options to default and reload item"
                onClick={this.onReset}
              >
                Reset to Default
              </button>
              <button
                className="btn btn-sm btn-primary"
                aria-label="Cancel and undo changes"
                onClick={this.onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}
