import { ItemCardViewModel } from "../Models/ItemCardViewModel";
import { ItemFilter, FilterOptions } from "../Models/ItemModels";
import * as GradeLevels from '../Models/GradeLevels';
import { parseQueryString } from "../Models/ApiModels";

export class FilterHelper {    
    static getFilterOptions() {
        return {
            subjects: [
                {
                    code: "ELA",
                    label: "English language arts / Literacy"
                },
                {
                    code: "MATH",
                    label: "Mathematics"
                }
            ],
            grades: [
                GradeLevels.GradeLevels.Elementary,
                GradeLevels.GradeLevels.Middle,
                GradeLevels.GradeLevels.High    
            ],
            techTypes: [
                {
                    code: "CAT",
                    label: "CAT"
                },
                {
                    code: "PT",
                    label: "Performance Items"
                }
            ]
        } as FilterOptions;
    }

    static filter(itemCards: ItemCardViewModel[], filter: ItemFilter) {
        if (filter.grade) {
            itemCards = itemCards.filter(i => GradeLevels.contains(filter.grade!, i.grade));
        }
        if (filter.subject) {
            itemCards = itemCards.filter(i => i.subjectCode === filter.subject!.code);
        }
        //TODO: What is CAT technology? Filter? Ignore?
        if (filter.techType && filter.techType.code.toUpperCase() === "PT") {
            itemCards = itemCards.filter(i => i.isPerformanceItem);
        }
        return itemCards;
    }

    static updateUrl(filter: ItemFilter) {
        let pairs: string[] = [];
        if (filter.grade && filter.grade !== GradeLevels.GradeLevels.All) {
            pairs.push("gradeLevel=" + filter.grade);
        }
        if (filter.subject) {
            pairs.push("subject=" + filter.subject.code);
        }
        if (filter.techType) {
            pairs.push("techType=" + filter.techType.code);
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
        const subject = filterOptions.subjects.find(s => s.code == queryObject["subject"]);
        const grade = Number(queryObject["gradeLevel"]) as GradeLevels.GradeLevels;
        const techType = filterOptions.techTypes.find(t => t.code == queryObject["techType"]);

        return {
            subject: subject,
            grade: grade,
            techType: techType
        } as ItemFilter;
    }
}