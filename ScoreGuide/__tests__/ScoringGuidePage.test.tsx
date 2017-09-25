import * as React from 'react';
import * as $ from 'jquery'
import { ScoringGuidePage } from '../ScoringGuidePage';
import { shallow, mount } from 'enzyme';

describe('ScoringGuidePage', () => {

    it('matches snapshot', () => {
        expect(shallow(<ScoringGuidePage/>)).toMatchSnapshot();
    });
});