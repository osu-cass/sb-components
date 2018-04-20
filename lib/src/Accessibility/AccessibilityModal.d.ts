import * as React from "react";
import { AccResourceGroupModel, ResourceSelectionsModel } from "@src/index";
export interface ItemAccessibilityModalProps {
    accResourceGroups: AccResourceGroupModel[];
    onSave: (accGroups: AccResourceGroupModel[]) => void;
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
export declare class ItemAccessibilityModal extends React.Component<ItemAccessibilityModalProps, ItemAccessibilityModalState> {
    constructor(props: ItemAccessibilityModalProps);
    toggleResourceType(resourceType: string): void;
    keyboardToggleResourceType(e: React.KeyboardEvent<HTMLAnchorElement>, resourceType: string): void;
    updateSelection: (selectionCode: string, resourceCode: string) => void;
    onSave: (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleShowModal: () => void;
    handleHideModal: () => void;
    renderResourceType(resourceType: string): JSX.Element;
    render(): JSX.Element;
}
