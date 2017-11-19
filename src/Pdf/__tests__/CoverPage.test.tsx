import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CoverPage } from '../CoverPage';
import { shallow, mount, render } from 'enzyme';

const date = {
    getMonth: () => "01",
    getDate: ()  => "12",
    getFullYear:  () => "2017"
}

describe("First page", () => {
    it("matches snapshot", () => {
        let wrapper = shallow(<CoverPage subject="math" grade="grade 3" date={date}/>);
        expect(wrapper).toMatchSnapshot();
    })
})