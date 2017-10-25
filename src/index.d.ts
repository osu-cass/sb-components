// Type definitions for react-advanced-filter@1.0.0-beta
// Project: reat-advanced-filter
// Definitions by: Daniel Van Horn <danvanhorn.github.io>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */


import {Component} from 'react';

export enum OptionType {
    inputBox,
    button
}

export interface AdvancedFilterOption {
    label: string;
    key: string;
    isSelected: boolean;
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

export interface Props {
    filterOptions: AdvancedFilterCategory[];
    onClick: (selected: AdvancedFilterCategory[]) => void;
}

export interface State {
    filters: AdvancedFilterCategory[];
    expanded: boolean
}

export class AdvancedFilterContainer extends Component<Props, State> { }
