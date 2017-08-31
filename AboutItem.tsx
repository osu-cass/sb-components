import * as React from 'react';
import * as Rubric from "./Rubric";
import * as ItemCard from './ItemCard';
import * as API from './ApiModels';

export interface AboutThisItem {
    rubrics: Rubric.Rubric[];
    itemCardViewModel: ItemCard.ItemCardViewModel;
    depthOfKnowledge: string;
    targetDescription: string;
    commonCoreStandardsDescription: string;
    educationalDifficulty: string;
    evidenceStatement: string;
}


export const ScoreSearchClient = (params: {bankKey: number, itemKey: number}) => API.get<AboutThisItem>("http://is-score.cass.oregonstate.edu/ScoringGuide/AboutThisItem", params) 
