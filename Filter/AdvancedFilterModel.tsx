import { GradeLevels } from "../Models/GradeLevels";

export enum OptionType {
    inputBox,
    button
}

export interface AdvancedFilterOption {
    label: string;
    key: string;
    order: string;
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

export interface FilterOptions {
    subjects: Subject[];
    grades: GradeLevels[];
    techTypes: TechType[];
}