// Type definitions for react-advanced-filter@1.0.0-beta
// Project: reat-advanced-filter
// Definitions by: Daniel Van Horn <danvanhorn.github.io>
import {Component} from 'react';

export enum OptionType {
    inputBox,
    button,
    radioBtn,
    DropDown
}

export interface BasicFilterOption extends AdvancedFilterOption { }

export interface AdvancedFilterOption {
    label: string;
    key: string;
    isSelected: boolean;
}

export interface BasicFilterCategory{
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

export interface TechType extends Subject { }

export interface Subject {
    code: string;
    label: string;
}

export interface AdvancedFilters {
    subjects: AdvancedFilterCategory;
    grades: AdvancedFilterCategory;
    techTypes: AdvancedFilterCategory;
}

export interface AdvancedProps {
    filterOptions: AdvancedFilterCategory[];
    onClick: (selected: AdvancedFilterCategory[]) => void;
}

export interface AdvancedState {
    filters: AdvancedFilterCategory[];
    expanded: boolean
}

export interface BasicProps {
    filterOptions: BasicFilterCategory[];
    onClick: (selected: BasicFilterCategory[]) => void;
}

export interface BasicState {
    filters: BasicFilterCategory[];
    expanded: boolean
}

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

export class AdvancedFilterContainer extends Component<AdvancedProps, AdvancedState> { }

export class BasicFilterContainer extends Component<BasicProps, BasicState> { }

export class FilterContainer extends Component<FilterProps, FilterState> { }