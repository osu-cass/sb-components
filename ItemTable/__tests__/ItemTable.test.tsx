import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataTable } from '../ItemTable';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemTable", () => {
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
        }
    }
    
    it("matches snapshot", () => {
        expect(shallow(<DataTable {...props}/>)).toMatchSnapshot();;
    })
})