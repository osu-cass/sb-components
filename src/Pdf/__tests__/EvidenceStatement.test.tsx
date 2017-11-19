import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EvidenceStatement } from '../EvidenceStatement';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("EvidenceStatement", () => {
    it("matches snapshot", () => {
        const wrapper = shallow(<EvidenceStatement statement="" />)
        expect(wrapper).toMatchSnapshot();
    })
})
