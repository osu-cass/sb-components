import { GradeLevels } from "../Models/GradeLevels";

export enum OptionType {
    input = 0,
    button = 1
};

export interface AdvancedFilterInfo {
    key:string;
    isMultiSelect:boolean;
}

export interface AdvancedFilterOption {
    label:string;
    key:string;
    order:string;
    selected: (data:AdvancedFilterInfo) => void;
    type: OptionType;
}

export interface AdvancedFilterCategory {
    disabled:boolean;
    isMultiSelect:boolean;
    label: string;
    helpText: string;
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