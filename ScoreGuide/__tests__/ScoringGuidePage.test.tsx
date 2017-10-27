import * as React from 'react';
import * as $ from 'jquery'
import { ScoringGuidePage, ItemsSearchViewModel } from '../ScoringGuidePage';
import * as ItemModels from '../../Models/ItemModels';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const func = jest.fn(() => {
    const subjects: ItemModels.Subject[] = [{code: "12648456",  label: "_label_"}];
    return new Promise<ItemsSearchViewModel>((resolve ,reject) => {
        let item: ItemsSearchViewModel = {subjects};
        resolve(item);
    })
})

const errFunc = jest.fn(() =>  {
    return new Promise<ItemsSearchViewModel>((resolve ,reject) => {
        reject(new Error("Search returned an error."));
    })
})

describe('ScoringGuidePage', () => {

    it('matches snapshot', () => {
        expect(shallow(<ScoringGuidePage scoreGuideViewModelClient={func}/>)).toMatchSnapshot();
    });

    it('calls the api successfully', () =>  {
        const wrapper = shallow(<ScoringGuidePage scoreGuideViewModelClient={func}/>)
        expect(func).toHaveBeenCalled();
    })

    it('calls the api which returns an error', () =>  {
        console.error = jest.fn(() => {});
        const wrapper = shallow(<ScoringGuidePage scoreGuideViewModelClient={errFunc}/>)
        expect(errFunc).toHaveBeenCalled();
    })
});