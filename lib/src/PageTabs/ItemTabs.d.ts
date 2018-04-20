import * as React from "react";
/**
 * Names of the different tab types.
 * @type {Tabs}
 */
export declare type Tabs = "viewer" | "rubric" | "information";
/**
 * ItemTabsProps props
 * @export
 * @interface ItemTabsProps
 */
export interface ItemTabsProps {
    changedTab: (tab: Tabs) => void;
    selectedTab: Tabs;
    showRubricTab?: boolean;
}
/**
 * ItemTabs displays options for view state of a selected item.
 * @export
 * @class ItemTabs
 * @extends {React.Component<ItemTabsProps, {}>}
 */
export declare class ItemTabs extends React.Component<ItemTabsProps, {}> {
    private select;
    constructor(props: ItemTabsProps);
    /**
     * event handler for view state.
     */
    onClick: (selectedVal: Tabs) => void;
    /**
     * renders individual tab components
     * @param {string} label
     * @param {Tabs} tabType
     * @returns
     */
    renderTab(label: string, tabType: Tabs): JSX.Element;
    render(): JSX.Element;
}
