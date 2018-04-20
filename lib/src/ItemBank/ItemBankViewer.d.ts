import * as React from "react";
import { AboutItemRevisionModel, AccResourceGroupModel, ItemRevisionModel, RevisionModel } from "@src/index";
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
export declare class ItemBankViewer extends React.Component<ItemBankViewerProps, {}> {
    constructor(props: ItemBankViewerProps);
    renderRightNav(): JSX.Element | undefined;
    renderNavButton(direction: "next" | "previous"): JSX.Element;
    renderItemDropDown(): JSX.Element | undefined;
    renderMidNav(): JSX.Element;
    renderRubricModal(): JSX.Element | undefined;
    renderAdvancedAboutItem(): JSX.Element | undefined;
    renderNavBar(): JSX.Element | undefined;
    render(): JSX.Element;
}
