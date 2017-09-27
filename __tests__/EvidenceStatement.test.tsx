import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EvidenceStatement } from '../EvidenceStatement';
import { shallow } from 'enzyme';

describe("EvidenceStatement", () => {
    it("matches snapshot", () => {
        const wrapper = shallow(<EvidenceStatement statement="" />)
        expect(wrapper).toMatchSnapshot();
    })
})
