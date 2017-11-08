import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterDecorator } from '../CenterDecorator';
import { NavMenu } from '../../src/Layout/NavMenu';
import { RouterDecorator } from '../RouterDecorator';
import { Link, NavLink } from 'react-router-dom';
import { SiteLinks } from './mocks';


storiesOf("LayoutNav", module)
    .addDecorator(RouterDecorator)
    .addDecorator(CenterDecorator)
    .add("name no links", () => <NavMenu siteName="Test" />)
    .add("name links", () => <NavMenu siteName="Test" links={SiteLinks} />)