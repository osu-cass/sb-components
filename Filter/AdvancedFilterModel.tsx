import * as AdvancedFilter from './AdvancedFilter';
// import * as AdvancedFilterContainer from './AdvancedFilterContainer';
import { GradeLevels } from "../Models/GradeLevels";

export interface LabelValue {
    label:string;
    value: string | number;
}

export interface Selection {
    fieldName: string;
    infoDescription: string;
    selectedValue?: string;
    options: LabelValue[];
}

// TODO: optimize options (look at ItemSearchDropDown)
export const Grades:Selection = {
    fieldName:"Grade",
    infoDescription:"Grade level for stuffasdasd",
    options: [
        {label:"All", value:GradeLevels.All},
        {label:"HighSchool", value:GradeLevels.High},
        {label:"MiddleSchool", value:GradeLevels.Middle},
        {label:"Elementary", value:GradeLevels.Elementary}
    ]
};