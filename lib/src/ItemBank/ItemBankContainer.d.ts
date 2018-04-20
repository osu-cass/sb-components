import * as React from "react";
import { AccResourceGroupModel, AboutItemRevisionModel, Resource, ItemRevisionModel, SectionModel, AccessibilityRevisionModel, RevisionModel } from "@src/index";
export interface ItemBankContainerProps {
    accessibilityClient: (acc: AccessibilityRevisionModel) => Promise<AccResourceGroupModel[]>;
    aboutItemRevisionClient: (item: ItemRevisionModel) => Promise<AboutItemRevisionModel>;
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
export declare class ItemBankContainer extends React.Component<ItemBankContainerProps, ItemBankContainerState> {
    private subscription;
    constructor(props: ItemBankContainerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    fetchAboutItemRevisionModel(item: ItemRevisionModel): Promise<AboutItemRevisionModel>;
    onFetchAboutItemSuccess(data: AboutItemRevisionModel): void;
    fetchAccResourceGroups(item: AboutItemRevisionModel): Promise<AccResourceGroupModel[]>;
    onFetchAccResourceSuccess(data: AccResourceGroupModel[]): void;
    fetchRevisions(item: ItemRevisionModel): Promise<RevisionModel[]>;
    onFetchRevisionsSuccess(data: RevisionModel[]): void;
    fetchSections(): Promise<SectionModel[]>;
    onFetchSectionsSuccess(data: SectionModel[]): void;
    onError(err: string, cb?: () => void): void;
    handleUpdateItems: (items: ItemRevisionModel[]) => void;
    /**
     * Updates prev and next items. Updates rubric, about item, and item url
     * @memberof ItemBankContainer
     */
    handleChangeViewItem: () => void;
    updateNavigationItems: () => void;
    handleUpdateIsaap: (accGroups: AccResourceGroupModel[]) => void;
    handleChangeRevision: () => void;
    onAccessibilityUpdate: (accResourceGroups: AccResourceGroupModel[]) => void;
    onAccessibilityReset: () => void;
    handleNextItem(): void;
    handlePreviousItem(): void;
    onDirectionSelect: (direction: "next" | "previous") => void;
    onItemSelect: (item: string) => void;
    onRevisionSelect: (revision: string) => void;
    renderItemBankEntry(): JSX.Element | undefined;
    renderItemBankViewer(): JSX.Element;
    render(): JSX.Element;
}
