import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { 
    AdvancedFilterContainer, 
    AdvancedFilterContainerProps,  
    FilterOptionModel, 
    OptionTypeModel, 
    AdvancedFilterCategoryModel 
} from '../../src';
import { mockAdvancedFilterCategories } from './mocks';

const props: AdvancedFilterContainerProps = {
    filterOptions: mockAdvancedFilterCategories,
    onClick: action("clicked")
}

storiesOf("AdvancedFilterContainer", module)
    .add("normal render", () => <AdvancedFilterContainer {...props} />)

