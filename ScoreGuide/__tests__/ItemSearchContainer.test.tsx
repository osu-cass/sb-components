import * as React from 'react';
import * as $ from 'jquery'
import * as ReactDOM from 'react-dom';
import { ItemSearchContainer } from '../ItemSearchContainer';
import { shallow, mount } from 'enzyme';

describe("ItemSearchContainer", () => {
    const props = {
        onRowSelection: jest.fn(),
        filterOptions: {
            subjects: [],
            grades: [],
            techTypes: []
        }
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemSearchContainer {...props}/>)).toMatchSnapshot();;
    })
})
