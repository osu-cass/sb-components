import * as React from "react";
import { BasicFilterCategoryModel, FilterOptionModel } from "@src/index";
export interface BasicFilterProps extends BasicFilterCategoryModel {
    selectedHandler: (data?: FilterOptionModel) => void;
}
/**
 * Renders a radio button or drop down list from
 * the FilterOptionModel passed in as props
 * @class BasicFilter
 * @extends {React.Component<BasicFilterProps, {}>}
 */
export declare class BasicFilter extends React.Component<BasicFilterProps, {}> {
    constructor(props: BasicFilterProps);
    findFilterOption(key: string): FilterOptionModel | undefined;
    searchHandler: (searchText: string) => void;
    renderSearch(): JSX.Element;
    /**
     * Renders JSX element of radio input category
     * @returns {JSX.Element} radio input category with selections
     */
    renderRadio(): JSX.Element;
    /**
     * Renders Select list for the category with default option
     * @returns {JSX.Element} Select React component
     */
    renderDropDown(): JSX.Element;
    /**
     * Renders the render Category based on the category type
     * @returns {(JSX.Element | undefined)} JSX element of category
     */
    renderCategory(): JSX.Element | undefined;
    /**
     * Renders an individual category
     * @returns default render method JSX Element
     */
    render(): JSX.Element;
}
