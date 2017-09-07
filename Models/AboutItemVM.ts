import * as Rubric from '../PageTabs/Rubric'
import * as ItemCardViewModel from './ItemCardViewModel'
import * as API from '../Models/ApiModels'

export const ScoreSearchClient = (params: { bankKey: number, itemKey: number }) => API.get<AboutThisItem>("http://is-score.cass.oregonstate.edu/ScoringGuide/AboutThisItem", params)

export interface AboutThisItem {
    rubrics: Rubric.Rubric[];
    itemCardViewModel: ItemCardViewModel.ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
    educationalDifficulty: string;
    evidenceStatement: string;
}