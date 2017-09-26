import * as React from 'react';
import * as $ from 'jquery'
import { ScoringGuidePage, ItemsSearchViewModel } from '../ScoringGuidePage';
import * as ItemModels from '../../Models/ItemModels';
import { shallow, mount } from 'enzyme';

const func = () => {
    const subjects: ItemModels.Subject[] = [];
    return new Promise<ItemsSearchViewModel>((resolve ,reject) => {
        let item: ItemsSearchViewModel = {subjects};
        resolve(item);
    })
}

describe('ScoringGuidePage', () => {

    it('matches snapshot', () => {
        expect(shallow(<ScoringGuidePage scoreGuideViewModelClient={func}/>)).toMatchSnapshot();
    });
});