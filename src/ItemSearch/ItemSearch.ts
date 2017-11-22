import { SearchAPIParamsModel, ItemsSearchModel } from "../ItemSearch/ItemSearchModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";


export class ItemSearch {

    public static filterItemCards(
        itemCards: ItemCardModel[],
        filter: SearchAPIParamsModel
    ): ItemCardModel[] {
        let results = itemCards;
        //item
        if (filter.itemId && filter.itemId !== "") {
            results = results.filter(i =>
                i.itemKey.toString().includes(filter.itemId || "")
            );
        }

        //grade level
        if (filter.gradeLevels && filter.gradeLevels != GradeLevels.NA) {
            results = results.filter(i =>
                GradeLevel.gradeLevelContains(filter.gradeLevels || GradeLevels.NA, i.grade)
            );
        }

        //subjects
        if (filter.subjects && filter.subjects.length > 0) {
            results = results.filter(i =>
                filter.subjects!.findIndex(s => s === i.subjectCode) !== -1
            );
        }

        //interaction types
        if (filter.interactionTypes && filter.interactionTypes.length > 0) {
            results = results.filter(i =>
                filter.interactionTypes!.findIndex(it => it === i.interactionTypeCode) !== -1
            );
        }

        //claims
        if (filter.claims && filter.claims.length > 0) {
            results = results.filter(i =>
                filter.claims!.findIndex(c => c === i.claimCode) !== -1
            );
        }

        //performance & cat
        if (filter.performanceOnly === true || filter.catOnly === true) {
            const performanceTask = filter.catOnly !== true || filter.performanceOnly === true;
            results = results.filter(i => i.isPerformanceItem === performanceTask);
        }

        //targets
        if (filter.targets && filter.targets.length > 0) {
            results = results.filter(i =>
                filter.targets!.findIndex(t => t === i.targetHash) !== -1
            );
        }

        return results; ///TODO: add sort
    }
}