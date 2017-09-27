import { GradeLevels } from "../Models/GradeLevels";

export enum OptionType {
    inputBox = 0,
    button = 1,
    defaultButton = 2
};

export interface AdvancedFilterInfo {
    key:string;
    isMultiSelect:boolean;
}

export interface AdvancedFilterOption {
    label:string;
    key:string;
    order:string;
    selectedHandler: (data:AdvancedFilterInfo) => void;
    isSelected:boolean;
    type: OptionType;
}

export interface AdvancedFilterCategory {
    disabled:boolean;
    isMultiSelect:boolean;
    label: string;
    helpText: string;
    selectedFilterOptions: string[]; // use keys
    filterOptions: AdvancedFilterOption[];
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