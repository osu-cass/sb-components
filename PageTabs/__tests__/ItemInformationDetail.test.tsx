import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemInformationDetail } from '../ItemInformationDetail';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("ItemInformationDetail", () => {
    const props = {
        itemCardViewModel: {
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
        },
        depthOfKnowledge: "",
        targetDescription: "",
        commonCoreStandardsDescription: "",
        educationalDifficulty: "",
        evidenceStatement: ""
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemInformationDetail {...props} />)).toMatchSnapshot();
    })
})