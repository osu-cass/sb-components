import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemPage } from '../ItemPage';
import * as Models from "../../Models";
import { shallow } from 'enzyme';
import { GradeLevels } from '../../../../client/src/Models/GradeLevels';


const rubric:  Models.Rubric = {
    language: "english",
    rubricEntries: [{    
        scorepoint: "",
        name: "",
        value: ""
    }],
    samples: [{
        maxValue: "",
        minValue: "",
        sampleResponses: [{
            purpose: "",
            scorePoint: "",
            name: "",
            sampleContent: ""
        }]     
    }]
}

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

const aboutItemVM: Models.AboutItemViewModel = {
    itemCardViewModel: itemVM,
    rubrics: [rubric],
    targetDescription: "string",
    depthOfKnowledge: "string",
    commonCoreStandardsDescription: "string",
    educationalDifficulty: "string",
    evidenceStatement: "string",
    associatedItems: "string"
}

const itemView: Models.ItemView = {
    id: "12334",
    html: null,
    picturePath: null,
    captured: true,
    type: Models.ViewType.html
}

const question: Models.Question = {
    id: "12334",
    view: itemView,
    data: aboutItemVM,
    questionNumber: 1
}

const itemGroup : Models.ItemGroup = {
    passage: null,
    questions: [question]
}

describe("EvidenceStatement", () => {
    it("matches snapshot", () => {
        expect(shallow(<ItemPage itemData={itemGroup} />)).toMatchSnapshot();
    })
})
