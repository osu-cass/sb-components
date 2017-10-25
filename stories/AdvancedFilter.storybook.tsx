import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AdvancedFilter, Props } from '../src/Filter/AdvancedFilter';
import { AdvancedFilterOption, OptionType, AdvancedFilterCategory } from '../src/Filter/AdvancedFilterModel';

const advancedFilterOption: AdvancedFilterOption = {
    label: "Grade 3",
    key: "12345",
    isSelected: false,
    type: OptionType.button,
}

const advancedFilterOptionsArray: AdvancedFilterOption[] = [
    {...advancedFilterOption, label: "Grade 1", key: "12346"},
    {...advancedFilterOption, label: "Grade 2", key: "12347"},
    {...advancedFilterOption},
    {...advancedFilterOption, label: "Grade 4", key: "12348"}
]

const advancedFilterCategory: AdvancedFilterCategory  = {
    disabled: false,
    isMultiSelect: false,
    label: "Grade 3",
    helpText: "Grade 3",
    filterOptions: [advancedFilterOption],
    displayAllButton: true
}

const selectedHandler = action("clicked filter");

const props: Props = {
    ...advancedFilterCategory,
    selectedHandler
}


storiesOf("AdvancedFilter", module)
    .add("one filter item", () => <AdvancedFilter {...props} />)
    .add("multiple filter items", () => <AdvancedFilter {...props} filterOptions={advancedFilterOptionsArray}/>)