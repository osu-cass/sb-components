import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AdvancedFilter } from '../src/Filter/AdvancedFilter';
import { advancedFilterProps, advancedFilterOptionsArray } from './mocks';
import { CenterDecorator } from './CenterDecorator';


storiesOf("AdvancedFilter", module)
    .addDecorator(CenterDecorator)
    .add("one filter item", () => <AdvancedFilter {...advancedFilterProps} />)
    .add("multiple filter items", () => <AdvancedFilter {...advancedFilterProps} filterOptions={advancedFilterOptionsArray} />)