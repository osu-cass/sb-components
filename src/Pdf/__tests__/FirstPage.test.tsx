import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FirstPage } from '../FirstPage';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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