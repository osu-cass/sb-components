import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {AdvancedFilterContainer, Props} from '../src/Filter/AdvancedFilterContainer';
import { AdvancedFilterOption, OptionType, AdvancedFilterCategory } from '../src/Filter/AdvancedFilterModel';
import { mockAdvancedFilterCategories } from './mocks';

const props: Props  = {
    filterOptions: mockAdvancedFilterCategories,
    onClick: action("clicked")
}



storiesOf("AdvancedFilterContainer", module)
    .add("normal render", ()  => <AdvancedFilterContainer {...props}/>)

