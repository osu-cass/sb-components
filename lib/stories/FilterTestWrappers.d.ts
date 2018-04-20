import * as React from "react";
import { AdvancedFilterCategoryModel, BasicFilterCategoryModel, BasicFilterContainerProps } from "@src/index";
export interface AdvFilContainerTestProps {
    isNested?: boolean;
    pageTitle?: string;
}
export interface AdvFilContainerTestState {
    filterCategories: AdvancedFilterCategoryModel[];
}
export declare class AdvFilContainerTestWrapper extends React.Component<AdvFilContainerTestProps, AdvFilContainerTestState> {
    constructor(props: AdvFilContainerTestProps);
    updateFilter: (filterCategories: AdvancedFilterCategoryModel[]) => void;
    render(): JSX.Element;
}
export interface BasFilContainerTestState {
    filterCategories: BasicFilterCategoryModel[];
}
export declare class BasFilContainerTestWrapper extends React.Component<BasicFilterContainerProps, BasFilContainerTestState> {
    constructor(props: BasicFilterContainerProps);
    updateFilter: (filterCategories: BasicFilterCategoryModel[]) => void;
    render(): JSX.Element;
}
export interface FilterContainerTestState {
    basicFilterCategories: BasicFilterCategoryModel[];
    advancedFilterCategories: AdvancedFilterCategoryModel[];
}
export declare class FilterContainerTestWrapper extends React.Component<{}, FilterContainerTestState> {
    constructor(props: {});
    updateBasicFilter: (basicFilterCategories: BasicFilterCategoryModel[]) => void;
    updateAdvancedFilter: (advancedFilterCategories: AdvancedFilterCategoryModel[]) => void;
    render(): JSX.Element;
}
export declare class SIWFilterContainerTestWrapper extends React.Component<{}, FilterContainerTestState> {
    constructor(props: {});
    updateBasicFilter: (basicFilterCategories: BasicFilterCategoryModel[]) => void;
    render(): JSX.Element;
}
