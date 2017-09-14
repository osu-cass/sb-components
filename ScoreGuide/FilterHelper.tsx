import { ItemCardViewModel } from "../Models/ItemCardViewModel";
import { ItemFilter } from "../Models/ItemModels";
import * as GradeLevels from '../Models/GradeLevels';

export class FilterHelper {
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

    }
}