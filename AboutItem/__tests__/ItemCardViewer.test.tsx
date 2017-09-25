import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemCardViewer } from '../ItemCardViewer';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemCardViewer", () => {
    it("matches snapshot", () => {
        expect(shallow(<ItemCardViewer/>)).toMatchSnapshot();;
    })
})


