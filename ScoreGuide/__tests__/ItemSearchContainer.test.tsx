import 'jsdom-global/register';
import * as React from 'react';
import * as $ from 'jquery'
import * as ReactDOM from 'react-dom';
import { ItemSearchContainer } from '../ItemSearchContainer';
import { ItemCardViewModel } from '../../Models/ItemCardViewModel';
import { AdvancedFilters, AdvancedFilterCategory } from "@osu-cass/react-advanced-filter";
import {FilterHelper} from "../../Models/FilterHelper"
import { DataTable } from '../../ItemTable/ItemTable';
import * as AboutItemVM from '../../Models/AboutItemVM';
import * as ApiModels from '../../Models/ApiModels';
import * as GradeLevels from '../../Models/GradeLevels';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const subject = {
    code: "subjectCode",
    label:  "subjectLabel"
}

const itemVM: ItemCardViewModel = {
    bankKey: 1,
    itemKey: 2,
    title: "title",
    grade: GradeLevels.GradeLevels.Grade3,
    gradeLabel: "gradeLabel",
    subjectCode: "subjectCode",
    subjectLabel: "subjectLabel",
    claimCode: "claimCode",
    claimLabel: "claimLabel",
    target: "target",
    interactionTypeCode: "interactionTypeCode",
    interactionTypeLabel: "interactionTypeLabel",
    isPerformanceItem: true
}

const searchClient = jest.fn(() => {
    return new Promise<ItemCardViewModel[]>((resolve, reject) => {
        let item: ItemCardViewModel[] = [itemVM]
        resolve(item);
    })
})

const searchClientErr = jest.fn(() => {
    return new Promise<ItemCardViewModel[]>((resolve, reject) => {
        reject(new Error("Search failed"))
    })
})

const onRowSelection = jest.fn((item: { itemKey: number, bankKey: number }, reset: boolean) => {
    return null;
})

const item: ApiModels.Resource<AboutItemVM.AboutThisItem> = {
    kind: "none"
}

const advancedFilterCategory: AdvancedFilterCategory ={
    disabled: false,
    isMultiSelect: false,
    label: "filter category",
    helpText: "you need help?",
    filterOptions: FilterHelper.getFilterOptions().grades.filterOptions,
    displayAllButton: true
}

const advancedFilters: AdvancedFilters = {
    subjects: advancedFilterCategory,
    grades: advancedFilterCategory,
    techTypes: advancedFilterCategory,
}

describe("ItemSearchContainer", () => {

    const props = {
        onRowSelection,
        searchClient,
        filterOptions: advancedFilters,
        item
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemSearchContainer {...props} />)).toMatchSnapshot();;
    })

    it("calls the api", () => {
        let wrapper = shallow(<ItemSearchContainer {...props} />);
        expect(searchClient).toHaveBeenCalled();
    })

    it("calls api which returns an error", () => {
        const errProps = {
            ...props,
            searchClient: searchClientErr
        }
        console.error = jest.fn(() => {});
        let wrapper = shallow(<ItemSearchContainer {...errProps} />);
        expect(searchClientErr).toHaveBeenCalled();
        expect(wrapper).toMatchSnapshot();
    })
})
