import "jsdom-global/register";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

import { GradeLevels, RubricModel, AboutItemModel, Resource, ItemCardModel } from '../../index';
import { ItemTableContainerProps, ItemTableContainer } from '../ItemTableContainer';

describe("ItemPageTable", () => {
    const tabs = ["item", "claimAndTarget", "subject", "grade", "interactionType"]

    const itemCards: ItemCardModel[] = [{
        bankKey: 1,
        itemKey: 3,
        title: "",
        grade: GradeLevels.All,
        gradeLabel: "",
        subjectCode: "",
        subjectLabel: "",
        claimCode: "",
        claimLabel: "",
        targetShortName: "",
        interactionTypeCode: "",
        interactionTypeLabel: "",
        isPerformanceItem: true,
        targetHash: 3123
    }]

    const rubrics: RubricModel[] = []

    const content: AboutItemModel = {
        rubrics,
        itemCardViewModel: itemCards[0],
        depthOfKnowledge: "depthOfKnowledge",
        targetDescription: "targetDescription",
        commonCoreStandardsDescription: "commonCoreStandardsDescription",
        educationalDifficulty: "educationalDifficulty",
        evidenceStatement: "evidenceStatement"
    }

    const item: Resource<AboutItemModel>= {
        kind: "success",
        content
    }

    const props: ItemTableContainerProps = {
        onRowSelection: jest.fn((item: { itemKey: number; bankKey: number }) => { return null }),
        itemCards,
        item
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemTableContainer {...props} />)).toMatchSnapshot();;
    })

    it("sorts list on header click", () => {
        let wrapper = mount(<ItemTableContainer {...props} />);
        tabs.forEach(tab => {
            wrapper.find(`th.${tab}`).simulate('click');
            expect(JSON.stringify(wrapper.html())).toMatchSnapshot();
        })
    })

    it("calls onRowSelection()", () => {
        let wrapper = mount(<ItemTableContainer {...props} />);
        wrapper.find('td.item').simulate('click');
        expect(props.onRowSelection).toHaveBeenCalled();
    })
})