import { selection } from './AdvancedFilter';
import { GradeLevels } from "../Models/GradeLevels";

export const Grades:selection = {
    fieldName:"Grade",
    infoDescription:"Grade level for stuffasdasd",
    options: [
        {label:"All",code: GradeLevels.All}
    ]
};