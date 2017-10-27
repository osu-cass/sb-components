import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemTabs, Tabs } from '../ItemTabs';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("PageTabs", () => {
    let tabs: Tabs[] = ["viewer", "rubric", "information"];
    const props = {
        changedTab: jest.fn((tab: Tabs) => {return null}),
        selectedTab: tabs[0]
    }

    it("matches snapshot for each tab", () => {
        let wrapper = shallow(<ItemTabs {...props}/>);
        tabs.forEach(tab => {
            wrapper.setProps({selectedTab: tab});
            expect(wrapper).toMatchSnapshot();
        })
    })

    it("changes tabs", () => {
        let wrapper = shallow(<ItemTabs {...props}/>);
        wrapper.find('div.tabs').childAt(0).simulate('click');
        expect(props.changedTab).toHaveBeenCalled();
    })
})