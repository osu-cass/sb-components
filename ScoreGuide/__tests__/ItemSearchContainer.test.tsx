import * as React from 'react';
import * as $ from 'jquery'
import * as ReactDOM from 'react-dom';
import { ItemSearchContainer } from '../ItemSearchContainer';
import { ItemCardViewModel } from '../../Models/ItemCardViewModel';
import * as GradeLevels from '../../Models/GradeLevels'
import { shallow, mount } from 'enzyme';

const itemVM: ItemCardViewModel = {
    bankKey: 1,
    itemKey: 2,
    title: "title",
    grade: GradeLevels.GradeLevels.All,
    gradeLabel: "gradeLabel",
    subjectCode: "subjectCode",
    subjectLabel: "subjectLabel",
    claimCode: "claimCode",
    claimLabel: "claimLabel",
    target: "target",
    interactionTypeCode: "interactionTypeCode",
    interactionTypeLabel: "interactionTypeLabel",
    isPerformanceItem: true
}

const searchClient = () => {
    return new Promise<ItemCardViewModel[]>((resolve, reject) => {
        let item: ItemCardViewModel[] = [itemVM]
        return item;
    })
}

describe("ItemSearchContainer", () => {
    
    const props = {
        onRowSelection: jest.fn(),
        searchClient,
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
