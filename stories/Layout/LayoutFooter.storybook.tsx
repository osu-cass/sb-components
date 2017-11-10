import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterDecorator } from '../CenterDecorator';
import { Footer } from '../../src';
import { RouterDecorator } from '../RouterDecorator';
import { Link, NavLink } from 'react-router-dom';
import { SiteLinks } from './mocks';


storiesOf("Layout Footer", module)
    .addDecorator(RouterDecorator)
    .add("default footer", () => <Footer />)