import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HeaderTable, headerColumns, HeaderSort, SortColumn, SortDirection } from '../ItemTableHeader';
import { ItemCardViewModel  } from '../../Models/ItemCardViewModel';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemTableHeader", () => {
    const tabs = ["item", "claimAndTarget", "subject", "grade", "interactionType"]
    
    const sorts: Array<HeaderSort> = [{
        col: headerColumns[0],
        direction: SortDirection.Ascending,
        resetSortCount: 1 
    }]; 
    
    const props = {
        columns: headerColumns,
        onHeaderClick: jest.fn((header:  SortColumn) => null),
        sorts,
    }
    
    it("matches snapshot", () => {
        expect(shallow(<HeaderTable {...props}/>)).toMatchSnapshot();;
    })

    it("calls onHeaderClick", () => {
        let wrapper = mount(<HeaderTable {...props}/>);
        tabs.forEach(tab =>  {
            wrapper.find(`th.${tab}`).simulate('click');
            expect(props.onHeaderClick).toHaveBeenCalled();
        })
    })

    it("sorts list on header click", () => {
        let wrapper = mount(<HeaderTable {...props}/>);
        tabs.forEach(tab => {
            const className = `th.${tab}`;
            wrapper.find(className).simulate('click');
            expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
            wrapper.find(className).simulate('click');
            expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
            wrapper.find(className).simulate('click');
            expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
        })
    })

})