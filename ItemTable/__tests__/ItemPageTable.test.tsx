import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemPageTable, Props } from '../ItemPageTable';
import * as GradeLevels from '../../Models/GradeLevels';
import * as ItemCardViewModel from '../../Models/ItemCardViewModel';
import * as ApiModels from '../../Models/ApiModels';
import * as Rubric from '../../PageTabs/Rubric';
import * as AboutItemVM from '../../Models/AboutItemVM';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

describe("ItemPageTable", () => {
    const tabs = ["item", "claimAndTarget", "subject", "grade", "interactionType"]

    const itemCards: ItemCardViewModel.ItemCardViewModel[] = [{
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

    const rubrics: Rubric.Rubric[] = []

    const content: AboutItemVM.AboutThisItem = {
        rubrics,
        itemCardViewModel: itemCards[0],
        depthOfKnowledge: "depthOfKnowledge",
        targetDescription: "targetDescription",
        commonCoreStandardsDescription: "commonCoreStandardsDescription",
        educationalDifficulty: "educationalDifficulty",
        evidenceStatement: "evidenceStatement"
    }

    const item: ApiModels.Resource<AboutItemVM.AboutThisItem> = {
        kind: "none",
        content
    }

    const props: Props = {
        onRowSelection: jest.fn((item: { itemKey: number; bankKey: number }) => { return null }),
        itemCards,
        item
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemPageTable {...props} />)).toMatchSnapshot();;
    })

    it("sorts list on header click", () => {
        let wrapper = mount(<ItemPageTable {...props} />);
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

    it("calls onRowSelection()", () => {
        let wrapper = mount(<ItemPageTable {...props} />);
        wrapper.find('td.item').simulate('click');
        expect(props.onRowSelection).toHaveBeenCalled();
    })
})