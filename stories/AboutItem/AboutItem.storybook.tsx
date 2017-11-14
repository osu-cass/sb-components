
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterDecorator } from '../CenterDecorator';
import { AboutItem } from '../../src';
import { aboutItemModel, rubrics, rubricsEsn, allRubrics} from './mocks';

storiesOf("About Item Modal", module)
    .addDecorator(CenterDecorator)
    .add("default", () => <AboutItem {...aboutItemModel}/>)
    .add("showing no rubrics", () => <AboutItem {...aboutItemModel} showModal={true}/>)
    .add("showing rubrics", () => <AboutItem {...aboutItemModel} showModal={true} rubrics={rubrics}/>) //TODO: Add Me
    .add("showing rubrics ESN", () => <AboutItem {...aboutItemModel} showModal={true} rubrics={rubricsEsn}/>) //TODO: Add Me
    .add("showing rubrics ENU ESN", () => <AboutItem {...aboutItemModel} showModal={true} rubrics={allRubrics}/>) //TODO: Add Me
    