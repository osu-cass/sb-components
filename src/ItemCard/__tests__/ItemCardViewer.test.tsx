import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemCardViewer } from '../ItemCardViewer';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';

import { ItemCardModel, RubricModel, AboutItemModel } from '../../';


describe("ItemCardViewer", () => {
    const itemCardViewModel: ItemCardModel = {
        bankKey: 1,
        itemKey: 123,
        title: "test_title",
        grade: 1,
        gradeLabel: "1",
        subjectCode: "Math",
        subjectLabel: "MTH",
        claimCode: "claim_1234",
        claimLabel: "claim_math",
        targetShortName: "something",
        interactionTypeCode: "type01",
        interactionTypeLabel: "type01label",
        isPerformanceItem: false,
        targetHash: 323
    }

    const rubrics: RubricModel[] = []

    const item: AboutItemModel = {
        rubrics,
        itemCardViewModel,
        depthOfKnowledge: "depthOfKnowledge",
        targetDescription: "targetDescription",
        commonCoreStandardsDescription: "commonCoreStandardsDescription",
        educationalDifficulty: "educationalDifficulty",
        evidenceStatement: "evidenceStatement"
    }

    it("renders viewer tab", () => {
        let wrapper = shallow(<ItemCardViewer item={item} />);
        wrapper.setState({ selectedTab: "viewer" });
        expect(wrapper).toMatchSnapshot();
    })

    it("renders rubric tab", () => {
        let wrapper = shallow(<ItemCardViewer item={item} />);
        wrapper.setState({ selectedTab: "rubric" });
        expect(wrapper).toMatchSnapshot();
    })

    it("renders information tab", () => {
        let wrapper = shallow(<ItemCardViewer item={item} />);
        wrapper.setState({ selectedTab: "information" });
        expect(wrapper).toMatchSnapshot();
    })
})


