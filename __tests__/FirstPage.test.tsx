import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FirstPage } from '../FirstPage';
import { shallow } from 'enzyme';

describe("EvidenceStatement", () => {
    it("matches snapshot", () => {
        expect(shallow(<FirstPage subject="math" grade="grade 3" />)).toMatchSnapshot()
    })
})