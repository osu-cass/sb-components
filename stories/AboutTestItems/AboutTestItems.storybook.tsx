
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterDecorator } from '../CenterDecorator';
import { AboutTestItemsContainer } from '../../src';
import { RouterDecorator } from '../RouterDecorator';
import {mockAboutTestClient, mockAboutTestClientLoading, mockAboutTestClientReject } from './mocks';

storiesOf("About Test Items", module)
    .addDecorator(RouterDecorator)
    .add("default", () => <AboutTestItemsContainer aboutClient={mockAboutTestClient} selectedCode="EQ"/>)
    .add("reject", () => <AboutTestItemsContainer aboutClient={mockAboutTestClientReject} selectedCode="EQ"/>)
    .add("loading", () => <AboutTestItemsContainer aboutClient={mockAboutTestClientLoading} selectedCode="EQ"/>)
    