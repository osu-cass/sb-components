import { ItemCardViewModel } from "../Models/ItemCardViewModel";
import { ItemFilter } from "../Models/ItemModels";
import * as GradeLevels from '../Models/GradeLevels';
import { parseQueryString } from "../Models/ApiModels";
import { AdvancedFilterCategory, FilterOptions } from "../filter/AdvancedFilterModel";

export class FilterHelper {    
    // {
    //     code: "CAT",
    //     label: "CAT"
    // },
    // {
    //     code: "PT",
    //     label: "Performance Items"
    // }


    //TODO: Get this from the server
    static getFilterOptions() {
        return {
            subjects: 
                {
                    disabled: false,
                    isMultiSelect: false,
                    label: "Subjects filter",
                    helpText: "Subjects HelpText here.",
                    filterOptions: [],
                    displayAllButton: true
                },
            grades: {
                disabled: false,
                isMultiSelect: true,
                label: "Grade filter",
                helpText: "Grade HelpText here.",
                filterOptions: [],
                displayAllButton: true
            },
            techTypes:
            {
                disabled: false,
                isMultiSelect: false,
                label: "TechType filter",
                helpText: "TechType HelpText here.",
                filterOptions: [],
                displayAllButton: true
            }
        } as FilterOptions;
    }

    static filter(itemCards: ItemCardViewModel[], filter: ItemFilter) {
        if (filter.grades && filter.grades.length > 0) {
            filter.grades.forEach(gradeFilter => 
                itemCards = itemCards.filter(i => GradeLevels.contains(gradeFilter, i.grade))
            );
        }
        if (filter.subjects && filter.subjects.length > 0) {
            const subjectCodes = filter.subjects.map(s => s.code);
            itemCards = itemCards.filter(i => subjectCodes.indexOf(i.subjectCode) !== -1);
        }
        //TODO: What is CAT technology? Filter? Ignore?
        if (filter.techTypes && filter.techTypes.length > 0) {
            if (filter.techTypes[0].code.toUpperCase() === "PT") {
                itemCards = itemCards.filter(i => i.isPerformanceItem);
            } else if (filter.techTypes[0].code.toUpperCase() === "CAT") {
                itemCards = itemCards.filter(i => !i.isPerformanceItem);
            }
        }
        return itemCards;
    }

    static updateUrl(filter: ItemFilter) {
        let pairs: string[] = [];
        if (filter.grades && filter.grades.length > 0) {
            const gradeString = filter.grades.map(g => g.toString()).join(',');
            pairs.push("gradeLevels=" + gradeString);
        }
        if (filter.subjects && filter.subjects.length > 0) {
            const subjString = filter.subjects.map(s => s.code).join(',');
            pairs.push("subjects=" + subjString);
        }
        if (filter.techTypes && filter.techTypes.length > 0) {
            const techTypesString = filter.techTypes.map(t => t.code).join(',');
            pairs.push("techTypes=" + techTypesString);
        }

        let query: string;
        if (pairs.length === 0) {
            query =  "/";
        } else {
            query = "?" + pairs.join("&");
        }
        history.replaceState(null, "", query);
    }

    static readUrl(filterOptions: FilterOptions) {
        const queryObject = parseQueryString(window.location.href);
        const subjects = queryObject["subjects"]
            ? queryObject["subjects"]!.map(subjCode => filterOptions.subjects.filterOptions.find(s => s.key === subjCode && s.isSelected)) // might want to remove selected flag
            : [];

        const grades = queryObject["grades"]
            ? queryObject["grades"]!
                .map(gradeCode => Number(gradeCode) as GradeLevels.GradeLevels)
            : [];

        const techTypes = queryObject["techTypes"]
            ? queryObject["techTypes"]!.map(typeCode => filterOptions.techTypes.filterOptions.find(t => t.key === typeCode && t.isSelected))
            : [];

        return {
            subjects: subjects,
            grades: grades,
            techTypes: techTypes
        } as ItemFilter;
    }
}