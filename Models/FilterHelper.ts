import { ItemCardViewModel } from "../Models/ItemCardViewModel";
import { ItemFilter, FilterOptions } from "../Models/ItemModels";
import * as GradeLevels from '../Models/GradeLevels';
import { parseQueryString } from "../Models/ApiModels";
import { AdvancedFilterCategory, AdvancedFilters, OptionType, AdvancedFilterOption } from "../filter/AdvancedFilterModel";

export class FilterHelper {

    //TODO: Get this from the server
    static getFilterOptions(): AdvancedFilters  {
        const subjectsFilterOptions: AdvancedFilterOption[] = [{
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

        const gradesFilterOptions: AdvancedFilterOption[] = [{
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Elementary),
            key: String(GradeLevels.GradeLevels.Elementary),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Grade3),
            key: String(GradeLevels.GradeLevels.Grade3),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Grade4),
            key: String(GradeLevels.GradeLevels.Grade4),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Grade5),
            key: String(GradeLevels.GradeLevels.Grade5),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Grade6),
            key: String(GradeLevels.GradeLevels.Grade6),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Grade7),
            key: String(GradeLevels.GradeLevels.Grade7),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.Grade8),
            key: String(GradeLevels.GradeLevels.Grade8),
            isSelected: false,
            type: OptionType.button
        }, {
            label: GradeLevels.caseToString(GradeLevels.GradeLevels.High),
            key: String(GradeLevels.GradeLevels.High),
            isSelected: false,
            type: OptionType.button
        }];

        const techTypesFilterOptions: AdvancedFilterOption[] = [{
            label: "CAT",
            key: "CAT",
            isSelected: false,
            type: OptionType.button
        }, {
            label: "Performance Items",
            key: "PT",
            isSelected: false,
            type: OptionType.button
        }];

        const subjects: AdvancedFilterCategory = {
            disabled: false,
            isMultiSelect: false,
            label: "Subjects",
            helpText: "Subjects HelpText here.",
            filterOptions: [...subjectsFilterOptions],
            displayAllButton: true
        }

        const grades: AdvancedFilterCategory = {
            disabled: false,
            isMultiSelect: false,
            label: "Grade",
            helpText: "Grade HelpText here.",
            filterOptions: [...gradesFilterOptions],
            displayAllButton: true
        }

        const techTypes: AdvancedFilterCategory = {
            disabled: false,
            isMultiSelect: false,
            label: "TechType",
            helpText: "TechType HelpText here.",
            filterOptions: [...techTypesFilterOptions],
            displayAllButton: false
        }

        const value: AdvancedFilters = {subjects, grades, techTypes};
        
        return value;
    }

    static filter(itemCards: ItemCardViewModel[], filter: AdvancedFilterCategory[]): ItemCardViewModel[] {
        const grades = filter.find(afc => afc.label === "Grade");
        const subjects = filter.find(afc => afc.label === "Subjects");
        const techTypes = filter.find(afc => afc.label === "TechType");

        if (grades && grades.filterOptions) {
            let selectedGrades = GradeLevels.GradeLevels.NA;

            grades.filterOptions.forEach(gradeFilter => {
                if (gradeFilter.isSelected) {
                    selectedGrades = selectedGrades | Number(gradeFilter.key);
                }
            });

            if (selectedGrades === GradeLevels.GradeLevels.NA) {
                selectedGrades = GradeLevels.GradeLevels.All;
            }

            itemCards = itemCards.filter(g => GradeLevels.contains(selectedGrades, g.grade));
        }

        if (subjects && subjects.filterOptions) {
            let subjectCode:string|undefined;

            subjects.filterOptions.forEach(s => {
                if(s.isSelected){
                    subjectCode = s.key;
                }
            });
            if(subjectCode !== undefined){
                itemCards = itemCards.filter(i => subjectCode === i.subjectCode);
            }
        }
        //TODO: What is CAT technology? Filter? Ignore?
        if (techTypes && techTypes.filterOptions) {
            if (techTypes.filterOptions.find(t => t.key === "PT" && t.isSelected)) {
                itemCards = itemCards.filter(i => i.isPerformanceItem);
            } else if (techTypes.filterOptions.find(t => t.key === "CAT" && t.isSelected)) {
                itemCards = itemCards.filter(i => !i.isPerformanceItem);
            }
        }

        return itemCards;
    }

    static updateUrl(filter: AdvancedFilterCategory[]) {
        let pairs: string[] = [];

        const grades = filter.find(afc => afc.label === "Grade");
        const subjects = filter.find(afc => afc.label === "Subjects");
        const techTypes = filter.find(afc => afc.label === "TechType");

        if (grades && !grades.disabled) {
            const gradeString: string[] = [];

            grades.filterOptions.forEach(g => {
                if (g.isSelected) {
                    gradeString.push(g.key.toString());
                }
            });

            if (gradeString.length !== 0) {
                gradeString.join(',');
                pairs.push("gradeLevels=" + gradeString);
            }
        }
        if (subjects && !subjects.disabled) {
            const subjString: string[] = [];

            subjects.filterOptions.forEach(s => {
                if (s.isSelected) {
                    subjString.push(s.key);
                }
            });

            if (subjString.length !== 0) {
                subjString.join(',');
                pairs.push("subjects=" + subjString);
            }
        }
        if (techTypes && !techTypes.disabled) {
            const techTypesString: string[] = [];

            techTypes.filterOptions.forEach(t => {
                if (t.isSelected) {
                    techTypesString.push(t.key);
                }
            });
            if (techTypesString.length !== 0) {
                techTypesString.join(',');
                pairs.push("techTypes=" + techTypesString);
            }
        }

        let query: string;
        if (pairs.length === 0) {
            query = "/";
        } else {
            query = "?" + pairs.join("&");
        }
        history.replaceState(null, "", query);
    }

    static readUrl(filterOptions: AdvancedFilters) {
        const queryObject = parseQueryString(window.location.href);
        const subjects = queryObject["subjects"]
            ? queryObject["subjects"]!.map(
                subjCode => {
                    let subject = filterOptions.subjects.filterOptions.find(s => s.key === subjCode);
                    if (subject) {
                        return {
                            code: subject.key,
                            label: subject.label
                        }
                    }
                }) : [];

        const grades = queryObject["grades"]
            ? queryObject["grades"]!
                .map(gradeCode => Number(gradeCode) as GradeLevels.GradeLevels)
            : [];

        const techTypes = queryObject["techTypes"]
            ? queryObject["techTypes"]!.map(typeCode => {
                let techType = filterOptions.techTypes.filterOptions.find(t => t.key === typeCode);
                if (techType) {
                    return {
                        code: techType.key,
                        label: techType.label
                    }
                }
            }) : [];

        return {
            subjects: subjects,
            grades: grades,
            techTypes: techTypes
        } as ItemFilter;
    }
}