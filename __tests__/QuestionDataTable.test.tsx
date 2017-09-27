import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuestionDataTable } from '../QuestionDataTable';
import * as Models from "../../Models";
import { shallow } from 'enzyme';

const itemVM: Models.ItemViewModel = {
    bankKey: 1,
    itemKey: 1,
    gradeLabel: "grade 3",
    subjectLabel: "math",
    claimCode: "234536",
    targetId: "23463467",
    domain: "MATH",
    depthOfKnowledge: "",
    commonCoreStandardId: ""
}

describe("QuestionDataTable", () => {
    it("matches snapshot", () => {
        expect(shallow(<QuestionDataTable tableData={itemVM} />)).toMatchSnapshot();
    })
})