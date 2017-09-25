import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemFrame } from '../ItemViewerFrame';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemViewerFrame", () => {
    const obj = {
        url: "http://test.com",
        loading:  false
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemFrame {...obj}/>)).toMatchSnapshot();;
    })
})