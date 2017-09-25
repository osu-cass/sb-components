import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemSearchDropdown } from '../ItemSearchDropDown';
import * as ItemModels from '../../Models/ItemModels';
import { GradeLevels } from '../../Models/GradeLevels';

describe("ItemFileDropDown", () => {
    const subject: ItemModels.Subject = {
        code: "12547456245",
        label: "234509383405"
    }
    const techType: ItemModels.TechType = subject;
    const subjects: Array<ItemModels.Subject> = [subject]
    const techTypes: Array<ItemModels.Subject> = [techType]

    const filterOptions: ItemModels.FilterOptions = {
        subjects,
        grades: [GradeLevels.All],
        techTypes
    }

    const itemFilter: ItemModels.ItemFilter = {
        subject: subject,
        grade: GradeLevels.All,
        techType: techType
    }

    const props = {
        filterOptions,
        onChange: jest.fn((params: ItemModels.ItemFilter) => {return null}),
        isLoading: false;
        itemFilter,
    }

    it("matches snapshot", () => {
        expect(shallow(<ItemSearchDropdown {...props} />)).toMatchSnapshot()
    })
})