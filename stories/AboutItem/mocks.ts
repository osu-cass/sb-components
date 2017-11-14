import { AboutItemModel, RubricModel } from "../../src";
import { completeItemCard } from "../ItemCard/mocks";

export const aboutItemModel: AboutItemModel = {
    depthOfKnowledge: "",
    targetDescription: "",
    commonCoreStandardsDescription: "",
    rubrics: [],
    itemCardViewModel: completeItemCard
}

//TODO: Add me
export const rubrics: RubricModel[] = []

//TODO: Add me
export const rubricsEsn: RubricModel[] = []

//TODO: Add me
export const allRubrics: RubricModel[] = rubrics.concat(rubricsEsn)