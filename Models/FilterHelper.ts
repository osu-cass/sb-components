import { ItemCardViewModel } from "../Models/ItemCardViewModel";
import { ItemFilter } from "../Models/ItemModels";
import * as GradeLevels from '../Models/GradeLevels';
import { parseQueryString } from "../Models/ApiModels";
import { AdvancedFilterCategory, FilterOptions,OptionType } from "../filter/AdvancedFilterModel";

export class FilterHelper {    
    //TODO: Get this from the server
    static getFilterOptions() {
        const subjectsFilterOptions = [{
            label: "Mathematics",
            key: "MATH",
            isSelected: false,
            type: OptionType.button
        },
        {
            label: "English",
            key: "ELA",
            isSelected: false,
            type: OptionType.button
        }];

        const gradesFilterOptions = [{
            label: "Elementary",
            key: String(GradeLevels.GradeLevels.Elementary),
            isSelected: false,
            type: OptionType.button
        },{
            label: "Grade 3",
            key: String(GradeLevels.GradeLevels.Grade3),
            isSelected: false,
            type: OptionType.button
        },{
            label: "Grade 4",
            key: String(GradeLevels.GradeLevels.Grade4),
            isSelected: false,
            type: OptionType.button
        }];

        const techTypesFilterOptions = [{
            label: "CAT",
            key: "CAT",
            isSelected: false,
            type: OptionType.button
        },{
            label: "Performance Items",
            key: "PT",
            isSelected: false,
            type: OptionType.button
        }];


        return {
            subjects: 
                {
                    disabled: false,
                    isMultiSelect: false,
                    label: "Subjects",
                    helpText: "Subjects HelpText here.",
                    filterOptions: [...subjectsFilterOptions],
                    displayAllButton: true
                },
            grades: {
                disabled: false,
                isMultiSelect: true,
                label: "Grade",
                helpText: "Grade HelpText here.",
                filterOptions: [...gradesFilterOptions],
                displayAllButton: true
            },
            techTypes:
            {
                disabled: false,
                isMultiSelect: false,
                label: "TechType",
                helpText: "TechType HelpText here.",
                filterOptions: [...techTypesFilterOptions],
                displayAllButton: true
            }
        } as FilterOptions;
    }

    static filter(itemCards: ItemCardViewModel[], filter: AdvancedFilterCategory[]):ItemCardViewModel[] {
        const grades = filter.find(afc => afc.label === "Grade");
        const subjects = filter.find(afc => afc.label === "Subjects");
        const techTypes = filter.find(afc => afc.label === "TechType"); 

        if(grades && grades.filterOptions){
            grades.filterOptions.forEach(gradeFilter => {
                itemCards = itemCards.filter(g => gradeFilter.isSelected && GradeLevels.contains(Number(gradeFilter.key), g.grade));
            });
        }
    
        if(subjects && subjects.filterOptions){
            const subjectCodes = subjects.filterOptions.map(s => s.isSelected ? s.key : "");
            itemCards = itemCards.filter(i => subjectCodes.indexOf(i.subjectCode) !== -1);
        }
        //TODO: What is CAT technology? Filter? Ignore?
        if(techTypes && techTypes.filterOptions){
            if (techTypes.filterOptions.find(t => t.key === "PT" && t.isSelected)) {
                itemCards = itemCards.filter(i => i.isPerformanceItem);
            } else if (techTypes.filterOptions.find(t => t.key === "CAT" && t.isSelected)) {
                itemCards = itemCards.filter(i => !i.isPerformanceItem);
            }
        }

        return itemCards;
    }

    // static filter(itemCards: ItemCardViewModel[], filter: ItemFilter) {
    // if (filter.grades) {
    //     filter.grades.forEach(gradeFilter => 
    //         itemCards = itemCards.filter(i => GradeLevels.contains(gradeFilter, i.grade))
    //     );
    //     }
    // if (filter.subjects) {
    //     const subjectCodes = filter.subjects.map(s => s.code);
    //     itemCards = itemCards.filter(i => subjectCodes.indexOf(i.subjectCode) !== -1);
    //     }
    //     //TODO: What is CAT technology? Filter? Ignore?
    // if (filter.techTypes && filter.techTypes.length > 0) {
    //     if (filter.techTypes[0].code.toUpperCase() === "PT") {
    //         itemCards = itemCards.filter(i => i.isPerformanceItem);
    //     } else if (filter.techTypes[0].code.toUpperCase() === "CAT") {
    //         itemCards = itemCards.filter(i => !i.isPerformanceItem);
    //     }
    //     }
    //     return itemCards;
    // }

    // static updateUrl(filter: ItemFilter) {
    //     let pairs: string[] = [];
    //     if (filter.grades && filter.grades.length > 0) {
    //         const gradeString = filter.grades.map(g => g.toString()).join(',');
    //         pairs.push("gradeLevels=" + gradeString);
    //     }
    //     if (filter.subjects && filter.subjects.length > 0) {
    //         const subjString = filter.subjects.map(s => s.code).join(',');
    //         pairs.push("subjects=" + subjString);
    //     }
    //     if (filter.techTypes && filter.techTypes.length > 0) {
    //         const techTypesString = filter.techTypes.map(t => t.code).join(',');
    //         pairs.push("techTypes=" + techTypesString);
    //     }

    //     let query: string;
    //     if (pairs.length === 0) {
    //         query =  "/";
    //     } else {
    //         query = "?" + pairs.join("&");
    //     }
    //     history.replaceState(null, "", query);
    // }

    static updateUrl(filter: AdvancedFilterCategory[]) {
        let pairs: string[] = [];
        
        const grades = filter.find(afc => afc.label === "Grade");
        const subjects = filter.find(afc => afc.label === "Subjects");
        const techTypes = filter.find(afc => afc.label === "TechType"); 

        if (grades && !grades.disabled) {
            const gradeString = grades.filterOptions.map(g => g.key +(','));
            pairs.push("gradeLevels=" + gradeString);
        }

        if (subjects && !subjects.disabled) {
            const subjString = subjects.filterOptions.map(s => s.key) +(',');
            pairs.push("subjects=" + subjString);
        }
        if (techTypes && !techTypes.disabled) {
            const techTypesString = techTypes.filterOptions.map(t => t.key) +(',');
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

    // static readUrl(filterOptions: FilterOptions):FilterOptions {
    //     const queryObject = parseQueryString(window.location.href);
    //     const subjectsFilterOptions = queryObject["subjects"]
    //         ? queryObject["subjects"]!.map(subjCode => {
    //             return filterOptions.subjects.filterOptions.find(s => s.key === subjCode && s.isSelected)
    //         }): []; // might want to remove selected flag

    //     const gradesFilterOptions = queryObject["grades"]
    //         ? queryObject["grades"]!
    //             .map(gradeCode => {
    //                 return filterOptions.grades.filterOptions.find(g => GradeLevels.contains(Number(g.key), Number(gradeCode)) && g.isSelected);
    //             }): [];

    //     const techTypesFilterOptions = queryObject["techTypes"]
    //         ? queryObject["techTypes"]!.map(typeCode => {
    //             return filterOptions.techTypes.filterOptions.find(t => t.key === typeCode && t.isSelected)
    //         }): [];

    //     const subjects = {...filterOptions.subjects};
    //     subjects.filterOptions = [...subjectsFilterOptions];

    //     const grades = {...filterOptions.grades};
    //     grades.filterOptions = [...gradesFilterOptions];

    //     const techTypes = {...filterOptions.techTypes};
    //     techTypes.filterOptions = [...techTypesFilterOptions];

    //     return {
    //         subjects: subjects,
    //         grades: grades,
    //         techTypes: techTypes
    //     };
    // }

    static readUrl(filterOptions: FilterOptions) {
        const queryObject = parseQueryString(window.location.href);
        const subjects = queryObject["subjects"]
            ? queryObject["subjects"]!.map(
                subjCode => { 
                    let subject = filterOptions.subjects.filterOptions.find(s => s.key === subjCode);
                    if(subject){
                        return {
                            code: subject.key,
                            label:subject.label
                        } 
                    }
                }): [];

        const grades = queryObject["grades"]
            ? queryObject["grades"]!
                .map(gradeCode => Number(gradeCode) as GradeLevels.GradeLevels)
            : [];

        const techTypes = queryObject["techTypes"]
            ? queryObject["techTypes"]!.map(typeCode => {
                let techType = filterOptions.techTypes.filterOptions.find(t => t.key === typeCode);
                if(techType){
                    return {
                        code: techType.key,
                        label:techType.label
                    }
                }
            }): [];

        return {
            subjects: subjects,
            grades: grades,
            techTypes: techTypes
        } as ItemFilter;
    }
}