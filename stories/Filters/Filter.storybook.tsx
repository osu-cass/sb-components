import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FilterContainer, FilterProps } from "../../src/Filter/FilterContainer";
import { mockAdvancedFilterCategories, mockBasicFilterCategories  } from './mocks';

const props: FilterProps  = {
    basicFilterOptions: mockBasicFilterCategories,
    onBasicFilterClick: action("clicked on a basic filter"),
    advancedFilterOptions: mockAdvancedFilterCategories,
    onAdvancedFilterClick: action("clicked on an advanced filter")
}

storiesOf("Filter Container", module)
    .add("Contains both Basic and Advanced Filter", () => <FilterContainer {...props}/>)