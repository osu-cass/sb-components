import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BasicFilter, Props } from '../../src/Filter/BasicFilter';
import { FilterOption, OptionType, BasicFilterCategory } from '../../src/Filter/AdvancedFilterModel';
import {CenterDecorator} from  '../CenterDecorator';

const basicFilterOption:FilterOption = {
    label: "Grade 3",
    key: "12345",
    isSelected: false
};

const advancedFilterOptionsArray: FilterOption[] = [
    {...basicFilterOption, label: "Grade 1", key: "12346"},
    {...basicFilterOption, label: "Grade 2", key: "12347"},
    {...basicFilterOption},
    {...basicFilterOption, label: "Grade 4", key: "12348"}
];

const basicFilterCategoryDropDown: BasicFilterCategory  = {
    disabled: false,
    label: "Grade 3",
    filterOptions: [basicFilterOption],
    type: OptionType.DropDown
}

const basicFilterCategoryRadioBtn: BasicFilterCategory  = {
    disabled: false,
    label: "Grade 3",
    filterOptions: [basicFilterOption],
    type: OptionType.radioBtn
}

const selectedHandler = action("clicked filter");

const propsDropDown: Props = {
    ...basicFilterCategoryDropDown,
    selectedHandler
}

const propsRadioBtn: Props = {
    ...basicFilterCategoryRadioBtn,
    selectedHandler
}

storiesOf("BasicFilter", module)
.addDecorator(CenterDecorator)
.add("DropDown: one filter item", () => <BasicFilter {...propsDropDown} />)
.add("DropDown: multiple filter items", () => <BasicFilter {...propsDropDown} filterOptions={advancedFilterOptionsArray}/>)
.add("RadioBtn: one filter item", () => <BasicFilter {...propsRadioBtn} />)
.add("RadioBtn: multiple filter items", () => <BasicFilter {...propsRadioBtn} filterOptions={advancedFilterOptionsArray}/>)