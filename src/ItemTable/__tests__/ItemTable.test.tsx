import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ItemTable } from '../ItemTable';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount, render } from 'enzyme';


import {
    ItemCardModel,
    GradeLevels,
    RubricModel,
    AboutItemModel,
    Resource
} from '../../index';

describe("ItemTable", () => {
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
        targetHash: 323
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

    const item: Resource<AboutItemModel> = {
        kind: "success",
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
            targetShortName: "",
            interactionTypeCode: "type01",
            interactionTypeLabel: "type01label",
            isPerformanceItem: false,
            targetHash: 2323
        },
        item
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemTable {...props} />)).toMatchSnapshot();;
    })
})