import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterDecorator } from '../CenterDecorator';
import { Layout } from '../../src/Layout/Layout';
import { RouterDecorator } from '../RouterDecorator';
import { Link, NavLink } from 'react-router-dom';
import { SiteLinks } from './mocks';


storiesOf("Layout", module)
    .addDecorator(RouterDecorator)
    .addDecorator(CenterDecorator)
    .add("name no links", () => <Layout siteName="Test" />)
    .add("name links", () => <Layout siteName="Test" links={SiteLinks} />)