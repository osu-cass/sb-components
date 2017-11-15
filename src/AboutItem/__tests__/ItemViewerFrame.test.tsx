import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemFrame } from '../ItemViewerFrame';
import * as TestUtils from 'react-dom/test-utils';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("ItemViewerFrame", () => {
    const obj = {
        url: "http://test.com",
    }

    it("matches snapshot while loading", () => {
        let wrapper = shallow(<ItemFrame {...obj}/>);
        wrapper.setState({loading: true});
        expect(wrapper).toMatchSnapshot();
    })

    it("after page content is loaded", () => {
        let wrapper = shallow(<ItemFrame {...obj}/>);
        wrapper.setState({loading: false});
        expect(wrapper).toMatchSnapshot();
    })

    it("no item found", () => {
        expect(shallow(<ItemFrame url=""/>)).toMatchSnapshot();
    })
})