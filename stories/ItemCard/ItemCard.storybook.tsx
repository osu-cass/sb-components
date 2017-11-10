import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterDecorator } from '../CenterDecorator';
import {completeItemCard} from './mocks';
import { ItemCardCondensed, ItemCard } from '../../src';

storiesOf("ItemCard", module)
.addDecorator(CenterDecorator)
.add("Item Card", () => <ItemCard {...completeItemCard}/>)
.add("Item Card Condensed", () => <ItemCardCondensed {...completeItemCard}/>)