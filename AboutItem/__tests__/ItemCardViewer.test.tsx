import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemCardViewer } from '../ItemCardViewer';
import * as AboutItemVM from '../../Models/AboutItemVM';
import * as ItemCardViewModel from '../../Models/ItemCardViewModel'
import * as Rubric from '../../PageTabs/Rubric';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemCardViewer", () => {
    const itemCardViewModel: ItemCardViewModel.ItemCardViewModel =  {
        bankKey: 1,
        itemKey: 123,
        title: "test_title",
        grade: 1,
        gradeLabel: "1",
        subjectCode: "Math",
        subjectLabel: "MTH",
        claimCode: "claim_1234",
        claimLabel: "claim_math",
        target: "",
        interactionTypeCode: "type01",
        interactionTypeLabel: "type01label",
        isPerformanceItem: false
    }

    const rubrics: Rubric.Rubric[] = []

    const item: AboutItemVM.AboutThisItem = {
        rubrics,
        itemCardViewModel,
        depthOfKnowledge: "depthOfKnowledge",
        targetDescription: "targetDescription",
        commonCoreStandardsDescription: "commonCoreStandardsDescription",
        educationalDifficulty: "educationalDifficulty",
        evidenceStatement: "evidenceStatement"
    }

    it("renders viewer tab", () => {
        let wrapper = shallow(<ItemCardViewer item={item}/>);
        wrapper.setState({selectedTab: "viewer"});
        expect(wrapper).toMatchSnapshot();
    })

    it("renders rubric tab", () =>  {
        let wrapper = shallow(<ItemCardViewer item={item}/>);
        wrapper.setState({selectedTab: "rubric"});
        expect(wrapper).toMatchSnapshot();
    })

    it("renders information tab", () =>  {
        let wrapper = shallow(<ItemCardViewer item={item}/>);
        wrapper.setState({selectedTab: "information"});
        expect(wrapper).toMatchSnapshot();
    })
})


