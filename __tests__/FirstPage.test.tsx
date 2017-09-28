import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FirstPage } from '../FirstPage';
import { shallow } from 'enzyme';

const date = {
    getMonth: () => "01",
    getDate: ()  => "12",
    getFullYear:  () => "2017"
}

describe("First page", () => {
    it("matches snapshot", () => {
        let wrapper = shallow(<FirstPage subject="math" grade="grade 3" date={date}/>);
        expect(wrapper).toMatchSnapshot();
    })
})