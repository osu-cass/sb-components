import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AdvancedFilter } from '../../src';
import { 
    selectedHandler, 
    advancedFilterSubject, 
    advancedFilterSubjectMulti,
    advancedFilterSubjectDisabled,
    advancedFilterSubjectDisabledMulti,
    advancedFilterSubjectMultiAll,
    advancedFilterSubjectMultiAllDisabled,
    subjectsFilterOptionsSelected
 } from './mocks';
import { CenterDecorator } from '../CenterDecorator';

//Advanced filter select actions won't persist, stories should be checking the rendering and not actions
storiesOf("AdvancedFilter", module)
    .addDecorator(CenterDecorator)
    .add("single select", () => <AdvancedFilter {...advancedFilterSubject} selectedHandler={selectedHandler}  />)
    .add("multi select", () => <AdvancedFilter {...advancedFilterSubjectMulti} selectedHandler={selectedHandler} filterOptions={subjectsFilterOptionsSelected}/>)
    .add("multi select all ", () => <AdvancedFilter {...advancedFilterSubjectMultiAll} selectedHandler={selectedHandler} />)
    .add("multi select all selected ", () => <AdvancedFilter {...advancedFilterSubjectMultiAll} selectedHandler={selectedHandler} filterOptions={subjectsFilterOptionsSelected}/>)
    .add("disabled", () => <AdvancedFilter {...advancedFilterSubjectDisabled} selectedHandler={selectedHandler}/>)
    .add("disabled with selections", () => <AdvancedFilter {...advancedFilterSubjectDisabled} selectedHandler={selectedHandler}  filterOptions={subjectsFilterOptionsSelected}/>)
    .add("disabled multi", () => <AdvancedFilter {...advancedFilterSubjectDisabledMulti} selectedHandler={selectedHandler}/>)
    .add("disabled multi all", () => <AdvancedFilter {...advancedFilterSubjectMultiAllDisabled} selectedHandler={selectedHandler}/>)
    .add("no options", () => <AdvancedFilter {...advancedFilterSubject} selectedHandler={selectedHandler}  filterOptions={[]}/>)
    