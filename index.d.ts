declare module '@osu-cass/sb-components/ApiModel' {
	export interface Loading {
	    kind: "loading";
	}
	export interface NotLoaded {
	    kind: "none";
	}
	export interface Success<T> {
	    kind: "success";
	    content: T | undefined;
	}
	export interface Failure {
	    kind: "failure";
	}
	export interface Reloading<T> {
	    kind: "reloading";
	    content: T | undefined;
	}
	export type Resource<T> = Loading | Success<T> | Reloading<T> | Failure | NotLoaded;
	export function parseQueryString(url: string): {
	    [key: string]: string[] | undefined;
	};
	export function getResourceContent<T>(resource: Resource<T>): T | undefined;
	export function get<T>(url: string, params?: object): Promise<T>;

}
declare module '@osu-cass/sb-components/Footer' {
	import * as React from 'react';
	export class Footer extends React.Component<{}, {}> {
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Filter/AdvancedFilterModel' {
	export enum OptionType {
	    inputBox = 0,
	    button = 1,
	    radioBtn = 2,
	    DropDown = 3,
	}
	export interface BasicFilterOption extends AdvancedFilterOption {
	}
	export interface AdvancedFilterOption {
	    label: string;
	    key: string;
	    isSelected: boolean;
	}
	export interface BasicFilterCategory {
	    disabled: boolean;
	    label: string;
	    filterOptions: BasicFilterOption[];
	    type: OptionType;
	}
	export interface AdvancedFilterCategory {
	    disabled: boolean;
	    isMultiSelect: boolean;
	    label: string;
	    helpText: string;
	    filterOptions: AdvancedFilterOption[];
	    displayAllButton: boolean;
	}
	export interface TechType extends Subject {
	}
	export interface Subject {
	    code: string;
	    label: string;
	}
	export interface AdvancedFilters {
	    subjects: AdvancedFilterCategory;
	    grades: AdvancedFilterCategory;
	    techTypes: AdvancedFilterCategory;
	}

}
declare module '@osu-cass/sb-components/Filter/AdvancedFilter' {
	import * as React from "react";
	import { AdvancedFilterCategory, AdvancedFilterOption } from '@osu-cass/sb-components/Filter/AdvancedFilterModel';
	export interface Props extends AdvancedFilterCategory {
	    selectedHandler: (data?: AdvancedFilterOption) => void;
	}
	export class AdvancedFilter extends React.Component<Props, {}> {
	    constructor(props: Props);
	    renderAllbtnContainer(): JSX.Element | undefined;
	    renderTags(): JSX.Element[];
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Filter/AdvancedFilterContainer' {
	import '@osu-cass/sb-components/Styles/advanced-filter.less';
	import * as React from "react";
	import { AdvancedFilterOption, AdvancedFilterCategory } from '@osu-cass/sb-components/Filter/AdvancedFilterModel';
	export interface AdvancedProps {
	    filterOptions: AdvancedFilterCategory[];
	    onClick: (selected: AdvancedFilterCategory[]) => void;
	}
	export interface AdvancedState {
	    filters: AdvancedFilterCategory[];
	    expanded: boolean;
	}
	export class AdvancedFilterContainer extends React.Component<AdvancedProps, AdvancedState> {
	    constructor(props: AdvancedProps);
	    handleClick: () => void;
	    onSelect(category: AdvancedFilterCategory, option?: AdvancedFilterOption): void;
	    resetFilters(): void;
	    hasActiveFilterIndicators(): boolean;
	    renderFilterIndicators(): JSX.Element[];
	    renderFilterHeader(): JSX.Element;
	    renderFilterBody(): JSX.Element;
	    renderCollapsedFilterContainer: () => JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Filter/BasicFilter' {
	import * as React from "react";
	import { BasicFilterCategory, BasicFilterOption } from '@osu-cass/sb-components/Filter/AdvancedFilterModel';
	export interface Props extends BasicFilterCategory {
	    selectedHandler: (data?: BasicFilterOption) => void;
	}
	export class BasicFilter extends React.Component<Props, {}> {
	    constructor(props: Props);
	    renderTags(): JSX.Element[];
	    findFilterOption(key: string): BasicFilterOption;
	    renderFilterBody(): JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Filter/BasicFilterContainer' {
	import '@osu-cass/sb-components/Styles/basic-filter.less';
	import * as React from "react";
	import { BasicFilterCategory, BasicFilterOption } from '@osu-cass/sb-components/Filter/AdvancedFilterModel';
	export interface BasicProps {
	    filterOptions: BasicFilterCategory[];
	    onClick: (selected: BasicFilterCategory[]) => void;
	    containsAdvancedFilter: boolean;
	    handleAdvancedFilterExpand: () => void;
	}
	export interface BasicState {
	    filters: BasicFilterCategory[];
	    expanded?: boolean;
	}
	export class BasicFilterContainer extends React.Component<BasicProps, BasicState> {
	    constructor(props: BasicProps);
	    onSelect(category: BasicFilterCategory, option?: BasicFilterOption): void;
	    resetFilters(): void;
	    keyPressResetFilters(e: React.KeyboardEvent<HTMLElement>): void;
	    renderFilters(): JSX.Element[];
	    handleClick(): void;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Filter/FilterContainer' {
	import * as React from "react";
	import { BasicFilterCategory, AdvancedFilterCategory } from '@osu-cass/sb-components/Filter/AdvancedFilterModel';
	export interface FilterProps {
	    basicFilterOptions: BasicFilterCategory[];
	    onBasicFilterClick: (selected: BasicFilterCategory[]) => void;
	    advancedFilterOptions: AdvancedFilterCategory[];
	    onAdvancedFilterClick: (selected: AdvancedFilterCategory[]) => void;
	}
	export interface FilterState {
	    basicFilters: BasicFilterCategory[];
	    advancedFilters: AdvancedFilterCategory[];
	    expanded: boolean;
	}
	export class FilterContainer extends React.Component<FilterProps, FilterState> {
	    constructor(props: FilterProps);
	    handleClick(): void;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/index' {
	export { AdvancedFilterContainer } from '@osu-cass/sb-components/Filter/AdvancedFilterContainer';
	export { BasicFilterContainer } from '@osu-cass/sb-components/Filter/BasicFilterContainer';
	export { FilterContainer } from '@osu-cass/sb-components/Filter/FilterContainer';
	export { OptionType, AdvancedFilterOption, AdvancedFilterCategory, BasicFilterOption, BasicFilterCategory, TechType, Subject, AdvancedFilters } from '@osu-cass/sb-components/Filter/AdvancedFilterModel';

}
declare module '@osu-cass/sb-components/Layout' {
	import * as React from 'react';
	export interface LayoutProps {
	    children?: React.ReactNode;
	}
	export class Layout extends React.Component<LayoutProps, {}> {
	    render(): JSX.Element;
	}

}
interface ObjectConstructor {
    assign<T1, T2>(target: T1, ...sources: T2[]): T1 & T2;
}
interface Array<T> {
    find(predicate: (search: T) => boolean): T;
}
interface String {
    startsWith(str: string): boolean;
    endsWith(str: string): boolean;
}
declare module '@osu-cass/sb-components/GradeLevels/GradeLevels' {
	export enum GradeLevels {
	    NA = 0,
	    Grade3 = 1,
	    Grade4 = 2,
	    Grade5 = 4,
	    Grade6 = 8,
	    Grade7 = 16,
	    Grade8 = 32,
	    Grade9 = 64,
	    Grade10 = 128,
	    Grade11 = 256,
	    Grade12 = 512,
	    Elementary = 7,
	    Middle = 56,
	    High = 960,
	    All = 1023,
	}
	export function caseToString(grade: GradeLevels): string;
	export function toString(grades: GradeLevels): string;
	export function contains(haystack: GradeLevels, needle: GradeLevels): boolean;

}
declare module '@osu-cass/sb-components/ItemCard/ItemCardModels' {
	import * as GradeLevels from '@osu-cass/sb-components/GradeLevels/GradeLevels';
	export function itemPageLink(bankKey: number, itemKey: number): void;
	export interface ItemCardViewModel {
	    bankKey: number;
	    itemKey: number;
	    title: string;
	    grade: GradeLevels.GradeLevels;
	    gradeLabel: string;
	    subjectCode: string;
	    subjectLabel: string;
	    claimCode: string;
	    claimLabel: string;
	    targetHash: string;
	    targetShortName: string;
	    interactionTypeCode: string;
	    interactionTypeLabel: string;
	}

}
declare module '@osu-cass/sb-components/AboutItem/AboutItemModels' {
	import { ItemCardViewModel } from '@osu-cass/sb-components/ItemCard/ItemCardModels';
	export interface SampleResponse {
	    purpose: string;
	    scorePoint: string;
	    name: string;
	    sampleContent: string;
	}
	export interface RubricSample {
	    maxValue: string;
	    minValue: string;
	    sampleResponses: SampleResponse[];
	}
	export interface RubricEntry {
	    scorepoint: string;
	    name: string;
	    value: string;
	}
	export interface Rubric {
	    language: string;
	    rubricEntries: RubricEntry[];
	    samples: RubricSample[];
	}
	export interface InteractionType {
	    code: string;
	    label: string;
	    description: string;
	    order?: number;
	}
	export interface AboutThisItemViewModel {
	    rubrics: Rubric[];
	    itemCardViewModel: ItemCardViewModel;
	    depthOfKnowledge: string;
	    targetDescription: string;
	    commonCoreStandardsDescription: string;
	}
	export interface AboutItemsViewModel {
	    interactionTypes: InteractionType[];
	    itemUrl: string;
	    selectedInteractionTypeCode: string;
	    aboutThisItemViewModel: AboutThisItemViewModel;
	}

}
declare module '@osu-cass/sb-components/AboutItem/AboutItemDetail' {
	import * as React from 'react';
	import * as AboutItemModels from '@osu-cass/sb-components/AboutItem/AboutItemModels';
	export class AboutThisItemDetailComponent extends React.Component<AboutItemModels.AboutThisItemViewModel, {}> {
	    renderField(label: string, value: string | number, className: string): JSX.Element | null;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Rubric/Collapsible' {
	import * as React from 'react';
	export interface Props {
	    className?: string;
	    style?: React.CSSProperties;
	    label: string;
	}
	export interface State {
	    isCollapsed: boolean;
	}
	export class CComponent extends React.Component<Props, State> {
	    constructor(props: Props);
	    toggleCollapsed(): void;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Rubric/RubricEntry' {
	import * as React from 'react';
	import * as AboutItemModels from '@osu-cass/sb-components/AboutItem/AboutItemModels';
	export class RubricEntryComponent extends React.Component<AboutItemModels.RubricEntry, {}> {
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/SampleResponse/SampleResponse' {
	import * as React from 'react';
	import * as AboutItemModels from '@osu-cass/sb-components/AboutItem/AboutItemModels';
	export class SampleResponseComponent extends React.Component<AboutItemModels.SampleResponse, {}> {
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Rubric/Rubric' {
	import * as React from 'react';
	import * as AboutItemModels from '@osu-cass/sb-components/AboutItem/AboutItemModels';
	export class RubricComponent extends React.Component<AboutItemModels.Rubric, {}> {
	    renderRubrics(): JSX.Element | null;
	    renderSampleResponses(): JSX.Element | null;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/AboutItem/AboutThisItem' {
	import * as React from 'react';
	import * as AboutItemModels from '@osu-cass/sb-components/AboutItem/AboutItemModels';
	export interface Props extends AboutItemModels.AboutThisItemViewModel {
	}
	export class AboutThisItemComponent extends React.Component<Props, {}> {
	    render(): JSX.Element | null;
	}

}
declare module '@osu-cass/sb-components/ItemViewer/ItemViewerFrame' {
	import * as React from 'react';
	export interface FrameProps {
	    url: string;
	}
	export interface FrameState {
	    loading: boolean;
	}
	export class ItemFrame extends React.Component<FrameProps, FrameState> {
	    constructor(props: FrameProps);
	    startLoad: () => void;
	    finishLoad: () => void;
	    renderNoItem(): JSX.Element;
	    renderItem(): JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/AboutItem/AboutItems' {
	import '@osu-cass/sb-components/Styles/about.less';
	import '@osu-cass/sb-components/Styles/item.less';
	import * as React from 'react';
	import * as AboutItemModels from '@osu-cass/sb-components/AboutItem/AboutItemModels';
	import { Resource } from '@osu-cass/sb-components/ApiModel';
	import { RouteComponentProps } from 'react-router';
	export const AboutThisClient: (params?: {
	    interactionTypeCode: string;
	} | undefined) => Promise<AboutItemModels.AboutItemsViewModel>;
	export interface State {
	    selectedCode?: string;
	    itemUrl?: string;
	    aboutThisItemViewModel: Resource<AboutItemModels.AboutThisItemViewModel>;
	    aboutItemsViewModel: Resource<AboutItemModels.AboutItemsViewModel>;
	}
	export interface Props extends RouteComponentProps<{}> {
	    aboutClient: (params?: {
	        interactionTypeCode: string;
	    }) => Promise<AboutItemModels.AboutItemsViewModel>;
	}
	export class AboutItemComponent extends React.Component<Props, State> {
	    constructor(props: Props);
	    handleChange: (e: React.FormEvent<HTMLSelectElement>) => void;
	    fetchUpdatedViewModel(newCode: string): void;
	    onFetchedUpdatedViewModel: (viewModel: AboutItemModels.AboutItemsViewModel) => void;
	    renderDescription(interactionTypes: AboutItemModels.InteractionType[]): JSX.Element;
	    renderInteractionTypesSelect(interactionTypes: AboutItemModels.InteractionType[]): JSX.Element;
	    openAboutItemModal(e: React.KeyboardEvent<HTMLAnchorElement>): void;
	    renderNoItem(): JSX.Element;
	    renderItemFrame(): JSX.Element;
	    private renderItemTypesGroup();
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/DropDown/DropDown' {
	import * as React from 'react';
	export interface Selection {
	    disabled: boolean;
	    label: string;
	    selectionCode: string;
	    order: number;
	    hidden: boolean;
	}
	export interface Props {
	    label: string;
	    disabled: boolean;
	    selectionCode: string;
	    selections: Selection[];
	    updateSelection(selectionCode: string, resourceCode: string): void;
	    defaultSelection: string;
	    resourceCode: string;
	}
	export class Dropdown extends React.Component<Props, {}> {
	    constructor(props: Props);
	    onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
	    renderOption: (selection: Selection) => JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Accessibility/Accessibility' {
	import * as Dropdown from '@osu-cass/sb-components/DropDown/DropDown';
	export interface AccessibilityResource {
	    resourceCode: string;
	    defaultSelection: string;
	    description: string;
	    disabled: boolean;
	    label: string;
	    currentSelectionCode: string;
	    order: number;
	    selections: Dropdown.Selection[];
	}
	export interface AccResourceGroup {
	    label: string;
	    order: number;
	    accessibilityResources: AccessibilityResource[];
	}
	export function getResource(resourceCode: string, resourceGroups: AccResourceGroup[]): AccessibilityResource | null;
	export function getBrailleAccommodation(accResourceGroups: AccResourceGroup[]): string;
	export function isBrailleEnabled(accResourceGroups: AccResourceGroup[]): boolean;
	export function isStreamlinedEnabled(accResourceGroups: AccResourceGroup[]): boolean;
	export function getResourceTypes(resourceGroups: AccResourceGroup[]): string[];
	export interface ResourceSelections {
	    [resourceName: string]: string;
	}

}
declare module '@osu-cass/sb-components/Accessibility/AccessibilityModal' {
	import * as React from 'react';
	import * as Accessibility from '@osu-cass/sb-components/Accessibility/Accessibility';
	export interface Props {
	    accResourceGroups: Accessibility.AccResourceGroup[];
	    onSave(selections: Accessibility.ResourceSelections): void;
	    onReset(): void;
	}
	export interface IsResourceExpanded {
	    [resourceType: string]: boolean;
	}
	export interface State {
	    resourceTypeExpanded: IsResourceExpanded;
	    resourceSelections: Accessibility.ResourceSelections;
	}
	export class ItemAccessibilityModal extends React.Component<Props, State> {
	    constructor(props: Props);
	    toggleResourceType(resourceType: string): void;
	    keyboardToggleResourceType(e: React.KeyboardEvent<HTMLAnchorElement>, resourceType: string): void;
	    /** Updates the selection based on user input, if item is braille, streamlined mode needs to be adjusted */
	    updateSelection: (selectionCode: string, resourceCode: string) => void;
	    onSave: (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => void;
	    onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
	    onReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
	    renderResourceType(type: string): JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Accessibility/Braille' {
	import * as React from 'react';
	export interface Props {
	    currentSelectionCode: string;
	    brailleItemCodes: string[];
	    braillePassageCodes: string[];
	    bankKey: number;
	    itemKey: number;
	}
	export interface State {
	    displaySpinner: boolean;
	}
	export class BrailleLink extends React.Component<Props, State> {
	    constructor(props: Props);
	    buildUrl(bankKey: number, itemKey: number): string;
	    enableSpinner(): void;
	    disableSpinner(): void;
	    checkDownloadCookie(count: number): void;
	    watchForDlStart(): void;
	    renderLoading(): JSX.Element | null;
	    render(): JSX.Element | null;
	}

}
declare module '@osu-cass/sb-components/Home/Home' {
	import '@osu-cass/sb-components/Styles/home.less';
	import * as React from 'react';
	import { RouteComponentProps } from 'react-router';
	export class Home extends React.Component<RouteComponentProps<{}>, {}> {
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/ItemCard/ItemCard' {
	import * as React from 'react';
	import * as ItemCardModels from '@osu-cass/sb-components/ItemCard/ItemCardModels';
	export class ItemCard extends React.Component<ItemCardModels.ItemCardViewModel, {}> {
	    handleKeyPress(bankKey: number, itemKey: number, e: React.KeyboardEvent<HTMLElement>): void;
	    shouldComponentUpdate(nextProps: Readonly<ItemCardModels.ItemCardViewModel>, nextState: Readonly<{}>, nextContext: any): boolean;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/ItemCard/ItemCardCondensed' {
	import * as React from 'react';
	import * as ItemCardModels from '@osu-cass/sb-components/ItemCard/ItemCardModels';
	export class ItemCardCondensed extends React.Component<ItemCardModels.ItemCardViewModel, {}> {
	    handleKeyPress(bankKey: number, itemKey: number, e: React.KeyboardEvent<HTMLElement>): void;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Modals/MoreLikeThisModal' {
	import * as React from 'react';
	import { ItemCardViewModel } from '@osu-cass/sb-components/ItemCard/ItemCardModels';
	export interface Column {
	    label: string;
	    itemCards: ItemCardViewModel[];
	}
	export interface Props {
	    gradeBelowItems: Column | null;
	    sameGradeItems: Column;
	    gradeAboveItems: Column | null;
	}
	export class Modal extends React.Component<Props, {}> {
	    renderColumn(column: Column | null): JSX.Element | undefined;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/PerformanceType/AboutPT' {
	import * as React from 'react';
	export interface Props {
	    subject: string;
	    description: string;
	}
	export class Modal extends React.Component<Props, {}> {
	    getSubjectHeader(): string;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/PerformanceType/AboutPTPopup' {
	import * as React from 'react';
	export interface Props {
	    subject: string;
	    description: string;
	    isPerformance: boolean;
	}
	export class Modal extends React.Component<Props, {}> {
	    shouldShowOnLoad(): void;
	    getSubjectText(): string;
	    getSubjectHeader(): string;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/Modals/ShareModal' {
	import * as React from 'react';
	export interface Props {
	    iSAAP: string;
	}
	export class ShareModal extends React.Component<Props, {}> {
	    constructor(props: Props);
	    copyToClipboard(event: any): void;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/ItemPage/ItemPageModels' {
	import * as Accessibility from '@osu-cass/sb-components/Accessibility/Accessibility';
	import { Props as moreLikeThis } from '@osu-cass/sb-components/Modals/MoreLikeThisModal';
	export interface ItemIdentifier extends Item {
	    itemName: string;
	}
	export interface Item {
	    bankKey: number;
	    itemKey: number;
	}
	export interface ItemIsaap extends Item {
	    isaap?: string;
	}
	export interface ItemPageViewModel {
	    itemViewerServiceUrl: string;
	    itemNames: string;
	    brailleItemNames: string;
	    brailleItem: ItemIdentifier;
	    nonBrailleItem: ItemIdentifier;
	    accessibilityCookieName: string;
	    isPerformanceItem: boolean;
	    performanceItemDescription: string;
	    subject: string;
	    moreLikeThisVM: moreLikeThis;
	    brailleItemCodes: string[];
	    braillePassageCodes: string[];
	    defaultIsaapCodes: string;
	}
	export function toiSAAP(accResourceGroups: Accessibility.AccResourceGroup[], defaultIsaap: string): string;
	export function resetResource(model: Accessibility.AccessibilityResource): Accessibility.AccessibilityResource;
	export function trimAccResource(resource: Accessibility.AccessibilityResource): {
	    label: string;
	    selectedCode: string;
	};
	export function toCookie(accGroups: Accessibility.AccResourceGroup[]): string;
	export function addDisabledPlaceholder(resource: Accessibility.AccessibilityResource): Accessibility.AccessibilityResource;

}
declare module '@osu-cass/sb-components/ItemPage/ItemPage' {
	import * as React from 'react';
	import * as Accessibility from '@osu-cass/sb-components/Accessibility/Accessibility';
	import * as AboutThisItem from '@osu-cass/sb-components/AboutItem/AboutThisItem';
	import * as ItemPageModels from '@osu-cass/sb-components/ItemPage/ItemPageModels';
	export interface Props extends ItemPageModels.ItemPageViewModel {
	    onSave: (selections: Accessibility.ResourceSelections) => void;
	    onReset: () => void;
	    aboutThisItemVM: AboutThisItem.Props;
	    currentItem: ItemPageModels.ItemIdentifier;
	    accResourceGroups: Accessibility.AccResourceGroup[];
	}
	export class Page extends React.Component<Props, {}> {
	    constructor(props: Props);
	    saveOptions: (resourceSelections: Accessibility.ResourceSelections) => void;
	    openAboutItemModal(e: React.KeyboardEvent<HTMLAnchorElement>): void;
	    openMoreLikeThisModal(e: React.KeyboardEvent<HTMLAnchorElement>): void;
	    openShareModal(e: React.KeyboardEvent<HTMLAnchorElement>): void;
	    openPerfTaskModal(e: React.KeyboardEvent<HTMLAnchorElement>): void;
	    openAccessibilityModal(e: React.KeyboardEvent<HTMLButtonElement>): void;
	    renderPerformanceItemModalBtn: (isPerformanceItem: boolean) => JSX.Element | undefined;
	    renderModals(): JSX.Element;
	    renderAccessabilityBtn(): JSX.Element;
	    renderModalFrames(): JSX.Element;
	    renderIFrame(): JSX.Element;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/ItemPage/ItemPageContainer' {
	import '@osu-cass/sb-components/Styles/item.less';
	import '@osu-cass/smarter-balanced-styles/styles/advanced-filter.less';
	import * as React from 'react';
	import * as Accessibility from '@osu-cass/sb-components/Accessibility/Accessibility';
	import * as AboutThisItem from '@osu-cass/sb-components/AboutItem/AboutThisItem';
	import * as ItemPageModels from '@osu-cass/sb-components/ItemPage/ItemPageModels';
	import { Resource } from '@osu-cass/sb-components/ApiModel';
	import { RouteComponentProps } from 'react-router';
	export const AboutThisItemViewModelClient: (params: ItemPageModels.Item) => Promise<AboutThisItem.Props>;
	export const ItemPageClient: (params: ItemPageModels.Item) => Promise<ItemPageModels.ItemPageViewModel>;
	export const ItemAccessibilityClient: (params: ItemPageModels.ItemIsaap) => Promise<Accessibility.AccResourceGroup[]>;
	export interface Props extends RouteComponentProps<{}> {
	    aboutThisClient: (params: ItemPageModels.Item) => Promise<AboutThisItem.Props>;
	    itemPageClient: (params: ItemPageModels.Item) => Promise<ItemPageModels.ItemPageViewModel>;
	    itemAccessibilityClient: (params: ItemPageModels.ItemIsaap) => Promise<Accessibility.AccResourceGroup[]>;
	}
	export interface State {
	    aboutThisItem: Resource<AboutThisItem.Props>;
	    itemPageVM: Resource<ItemPageModels.ItemPageViewModel>;
	    itemAccessibility: Resource<Accessibility.AccResourceGroup[]>;
	    currentItem?: ItemPageModels.ItemIdentifier;
	    item: ItemPageModels.Item;
	}
	export class ItemPageContainer extends React.Component<Props, State> {
	    constructor(props: Props);
	    private setCurrentItem();
	    onGetItemPage(data: ItemPageModels.ItemPageViewModel): void;
	    onGetItemAccessibility(data: Accessibility.AccResourceGroup[]): void;
	    onError(err: any): void;
	    private getItemPage();
	    private getAboutItem();
	    private getItemAccessibility();
	    onSave: (selections: Accessibility.ResourceSelections) => void;
	    private updateCookie(cookieName, accGroups?);
	    onReset: () => void;
	    fetchUpdatedAboutThisItem(): void;
	    onFetchedUpdatedViewModel(viewModel: AboutThisItem.Props): void;
	    onFetchUpdatedAboutError(err: any): void;
	    render(): JSX.Element;
	}

}
declare module '@osu-cass/sb-components/ItemSearch/ItemsSearchModels' {
	import * as GradeLevels from '@osu-cass/sb-components/GradeLevels/GradeLevels';
	export interface SubjectClaims {
	    [subject: string]: {
	        text: string;
	        value: string;
	    }[];
	}
	export interface InteractionType {
	    code: string;
	    label: string;
	}
	export interface Subject {
	    code: string;
	    label: string;
	    claims: Claim[];
	    interactionTypeCodes: string[];
	}
	export interface Claim {
	    code: string;
	    label: string;
	    targets: Target[];
	}
	export interface Target {
	    name: string;
	    nameHash: number;
	}
	export interface SearchAPIParams {
	    itemId: string;
	    gradeLevels: GradeLevels.GradeLevels;
	    subjects: string[];
	    claims: string[];
	    interactionTypes: string[];
	    performanceOnly: boolean;
	    targets: number[];
	}
	export interface ItemsSearchViewModel {
	    interactionTypes: InteractionType[];
	    subjects: Subject[];
	}

}
