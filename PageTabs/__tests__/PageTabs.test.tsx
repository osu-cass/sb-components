import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemTabs, Tabs } from '../PageTabs';
import { shallow, mount } from 'enzyme';

describe("PageTabs", () => {
    let tabs: Tabs = "viewer";
    const props = {
        changedTab: jest.fn(),
        selectedTab: tabs
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemTabs {...props}/>)).toMatchSnapshot();;
    })
})