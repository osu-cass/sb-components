import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataTable } from '../ItemTable';
import * as TestUtils from 'react-dom/test-utils';
import * as ItemCardViewModel from '../../Models/ItemCardViewModel';
import * as GradeLevels from '../../Models/GradeLevels';
import * as Rubric from '../../PageTabs/Rubric';
import * as AboutItemVM from '../../Models/AboutItemVM';
import * as ApiModels from '../../Models/ApiModels';
import { shallow, mount } from 'enzyme';

describe("ItemTable", () => {
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
    
    const props = {
        tableRef: jest.fn(),
        mapRows: [],
        rowOnClick: jest.fn(),
        sort: [],
        columns: [],
        selectedRow: {
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
        item
    }
    
    it("matches snapshot", () => {
        expect(shallow(<DataTable {...props}/>)).toMatchSnapshot();;
    })
})