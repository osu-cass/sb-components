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