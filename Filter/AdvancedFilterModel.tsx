import { selection } from './AdvancedFilter';
import { GradeLevels } from "../Models/GradeLevels";

// TODO: optimize options (look at ItemSearchDropDown)
export const Grades:selection = {
    fieldName:"Grade",
    infoDescription:"Grade level for stuffasdasd",
    options: [
        {label:"All", code:GradeLevels.All},
        {label:"HighSchool", code:GradeLevels.High},
        {label:"MiddleSchool", code:GradeLevels.Middle},
        {label:"Elementary", code:GradeLevels.Elementary}
    ]
};