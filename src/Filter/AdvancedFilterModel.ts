export enum OptionType {
    inputBox,
    button,
    radioBtn,
    DropDown
}

export interface FilterOption {
    label: string;
    key: string;
    isSelected: boolean;
}

export interface BasicFilterCategory extends FilterCategory{
    type: OptionType;
}

interface FilterCategory {
    disabled: boolean;
    label: string;
    filterOptions: FilterOption[];
    helpText?: string;
}


export interface AdvancedFilterCategory extends FilterCategory {
    isMultiSelect: boolean;
    filterOptions: FilterOption[];
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