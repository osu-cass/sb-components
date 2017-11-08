import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BasicFilterContainer, BasicProps} from '../../src/Filter/BasicFilterContainer';
import { FilterOption, OptionType, BasicFilterCategory } from '../../src/Filter/AdvancedFilterModel';
import { mockBasicFilterCategories } from './mocks';



const props: BasicProps  = {
    filterOptions: mockBasicFilterCategories,
    onClick: action("clicked"),
    containsAdvancedFilter: false,
    handleAdvancedFilterExpand: () => {}
}

storiesOf("BasicFilterContainer", module)
    .add("Basic Filter only", () => <BasicFilterContainer {...props}/>)
    .add("Basic Filter with Advanced filter expansion button", () => <BasicFilterContainer {...props} containsAdvancedFilter={true}/>)