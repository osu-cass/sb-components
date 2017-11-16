import { AboutItemModel, RubricModel } from "../../src";
import { completeItemCard } from "../ItemCard/mocks";
import { GradeLevels } from "../../src/GradeLevels/GradeLevels";

export const AboutItemMockModel: AboutItemModel = {
    depthOfKnowledge: "",
    targetDescription: "",
    commonCoreStandardsDescription: "",
    rubrics: [],
    itemCardViewModel: completeItemCard,
    educationalDifficulty: "",
    evidenceStatement: ""
}

//TODO: Add me
export const rubrics: RubricModel[] = []

//TODO: Add me
export const rubricsEsn: RubricModel[] = []

//TODO: Add me
export const allRubrics: RubricModel[] = rubrics.concat(rubricsEsn)