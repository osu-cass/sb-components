import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemPageTable } from '../ItemPageTable';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemPageTable", () => {
    const props = {
        onRowSelection: jest.fn(),
        itemCards: [] 
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemPageTable {...props}/>)).toMatchSnapshot();;
    })
})