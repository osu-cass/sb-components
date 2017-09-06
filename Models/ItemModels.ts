import * as $ from 'jquery';
import * as GradeLevels from '../GradeLevels';
import * as API from './ApiModels';
import * as ItemCardViewModel from './ItemCardViewModel';

export interface ScoreSearchParams {
    gradeLevels: GradeLevels.GradeLevels;
    subjects: string[];
    techType: string[];
}

export const ScoreSearchClient = (params: ScoreSearchParams) => API.get<ItemCardViewModel.ItemCardViewModel[]>("http://is-score.cass.oregonstate.edu/ScoringGuide/Search", params) 
