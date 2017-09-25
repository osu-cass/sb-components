import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HeaderTable, headerColumns, HeaderSort, SortColumn, SortDirection } from '../ItemTableHeader';
import { ItemCardViewModel  } from '../../Models/ItemCardViewModel';
import * as TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

describe("ItemTableHeader", () => {
    const sorts: Array<HeaderSort> = [{
        col: headerColumns[0],
        direction: SortDirection.Ascending,
        resetSortCount: 1 
    }]; 
    
    const props = {
        columns: headerColumns,
        onHeaderClick: jest.fn((header:  SortColumn) => null),
        sorts,
    }
    
    it("matches snapshot", () => {
        expect(shallow(<HeaderTable {...props}/>)).toMatchSnapshot();;
    })
})