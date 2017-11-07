import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuestionDataTable } from '../QuestionDataTable';
import * as Models from "../../Models";
import { configure, shallow } from 'enzyme';
import { GradeLevels } from '../../../../client/src/Models/GradeLevels';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const itemVM: Models.ItemViewModel = {
    bankKey: 1,
    itemKey: 1,
    gradeLabel: "grade 3",
    subjectLabel: "math",
    claimCode: "234536",
    targetId: "23463467",
    domain: "MATH",
    depthOfKnowledge: "",
    commonCoreStandardId: "",
    title: "",
    grade: GradeLevels.Grade6,
    subjectCode: "MATH",
    claimLabel: "Math Claim",
    target: "1-3",
    interactionTypeCode: "",
    interactionTypeLabel: "",
    isPerformanceItem: false
}

describe("QuestionDataTable", () => {
    it("matches snapshot", () => {
        expect(shallow(<QuestionDataTable tableData={itemVM} />)).toMatchSnapshot();
    })
})