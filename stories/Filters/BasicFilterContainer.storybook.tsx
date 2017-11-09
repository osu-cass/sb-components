import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { mockBasicFilterCategories } from './mocks';
import { BasicFilterContainer, BasicFilterContainerProps } from '../../src/Filter/BasicFilterContainer';



const props: BasicFilterContainerProps  = {
    filterOptions: mockBasicFilterCategories,
    onClick: action("clicked"),
    containsAdvancedFilter: false,
    handleAdvancedFilterExpand: () => {}
}

storiesOf("BasicFilterContainer", module)
    .add("Basic Filter only", () => <BasicFilterContainer {...props}/>)
    .add("Basic Filter with Advanced filter expansion button", () => <BasicFilterContainer {...props} containsAdvancedFilter={true}/>)