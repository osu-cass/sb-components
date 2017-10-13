import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AdvancedFilter, Props } from '../AdvancedFilter';
import { AdvancedFilterOption, OptionType, AdvancedFilterCategory } from '../AdvancedFilterModel';

const advancedFilterOption = {
    label: "Grade 3",
    key: "12345",
    isSelected: false,
    type: OptionType.button,
}

const advancedFilterOptionsArray = [
    {...advancedFilterOption, label: "Grade 1", key: "12346"},
    {...advancedFilterOption, label: "Grade 2", key: "12347"},
    {...advancedFilterOption},
    {...advancedFilterOption, label: "Grade 4", key: "12348"}
]

const advancedFilterCategory = {
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