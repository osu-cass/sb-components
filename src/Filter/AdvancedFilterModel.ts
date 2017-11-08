import {Subject} from "../ItemSearch/ItemSearchModels";

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

export interface FilterCategory {
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

export interface AdvancedFilters {
    subjects: AdvancedFilterCategory;
    grades: AdvancedFilterCategory;
    techTypes: AdvancedFilterCategory;
}