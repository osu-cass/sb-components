import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemPageTable, Props } from '../ItemPageTable';
import * as GradeLevels from '../../Models/GradeLevels';
import * as ItemCardViewModel from '../../Models/ItemCardViewModel'
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

describe("ItemPageTable", () => {
    const itemCards: ItemCardViewModel.ItemCardViewModel[]  = [{
        bankKey: 1,
        itemKey: 3,
        title: "",
        grade: GradeLevels.GradeLevels.All,
        gradeLabel: "",
        subjectCode: "",
        subjectLabel: "",
        claimCode: "",
        claimLabel: "",
        target: "",
        interactionTypeCode: "",
        interactionTypeLabel: "",
        isPerformanceItem: true
    }]
    
    const props: Props = {
        onRowSelection: jest.fn(),
        itemCards 
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemPageTable {...props}/>)).toMatchSnapshot();;
    })

    // it("sorts list on header click", () => {
    //     let wrapper = mount(<ItemPageTable {...props}/>);
    //     wrapper.find('th.item').simulate('click');
    //     expect(wrapper.state('dirElem')).toEqual('')

    // })
})